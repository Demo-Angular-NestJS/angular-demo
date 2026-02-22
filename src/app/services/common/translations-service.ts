import { Injectable, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslationLoaderByLangType } from '@core/translate';
import { LoadTranslationResultModel } from '@m/load-translation-result.models';
import { HashMap, TranslateParams, TranslocoService } from '@ngneat/transloco';
import { TranslationLanguageEnum } from 'app/enum';
import { from } from 'rxjs';
import { distinctUntilChanged, filter, map, mergeMap, tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class TranslationsService {
  private _translocoService = inject(TranslocoService);
  private _destroyRef = inject(DestroyRef);
  private _registeredScopes = new Set<string>();

  public translate = <T = string>(key: TranslateParams, params?: HashMap, lang?: string): T =>
    this._translocoService.translate(key, params, lang);

  public translateSignal(key: string, params?: HashMap, scope?: string) {
    return this._translocoService.selectTranslate(key, params, scope);
  }

  public registerTranslations(scope: string, loader: TranslationLoaderByLangType): void {
    if (this._registeredScopes.has(scope)) return;
    this._registeredScopes.add(scope);

    const loadedLangs = new Set<TranslationLanguageEnum>();

    this._translocoService.langChanges$.pipe(
      distinctUntilChanged(),
      // Ensure we don't spam logs while loading
      tap(() => (this._translocoService.config.missingHandler.logMissingKey = false)),
      map(lang => lang as TranslationLanguageEnum),
      filter(lang => !loadedLangs.has(lang)),
      // mergeMap allows parallel loading of different languages/scopes
      mergeMap(lang => from(this.loadTranslation(loader, lang, scope))),
      takeUntilDestroyed(this._destroyRef)
    ).subscribe(result => {
      this._translocoService.config.missingHandler.logMissingKey = true;

      if (result.translation) {
        // Set translation using the scope as a nested key
        this._translocoService.setTranslation(
          { [result.scope]: result.translation },
          result.lang,
          { merge: true } // Crucial: merges with existing translations
        );
        loadedLangs.add(result.lang as TranslationLanguageEnum);
      }
    });
  }

  public translatePageTitle(titleKey = '', param = ''): string {
    const t = (key: string) => this._translocoService.translate(key);

    const translatedTitle = t(`global.pageTitles.${titleKey}`);
    const projectName = t('global.projectShortName');

    const parts = [translatedTitle, param, projectName].filter(Boolean);
    return parts.join(' - ');
  }

  private async loadTranslation(
    loader: TranslationLoaderByLangType,
    lang: TranslationLanguageEnum,
    scope: string
  ): Promise<LoadTranslationResultModel> {
    try {
      const data = await loader(lang);
      return {
        translation: data['default'] ?? data,
        lang,
        scope,
      };
    } catch (error) {
      console.error(`[TranslationsService]: Failed to load "${lang}" for "${scope}"`, error);
      return { translation: null, lang, scope };
    }
  }
}

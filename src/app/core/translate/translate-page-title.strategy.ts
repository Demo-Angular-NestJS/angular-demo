import { Injectable, inject, DestroyRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslationsService } from '@s/common';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({ providedIn: 'root' })
export class TranslationPageTitleStrategy extends TitleStrategy {
  private readonly _title = inject(Title);
  private readonly _translationsService = inject(TranslationsService);
  private readonly _translocoService = inject(TranslocoService);
  private readonly _destroyRef = inject(DestroyRef);

  private _lastTitleKey = '';

  constructor() {
    super();
    this.listenToLanguageChanges();
  }

  override updateTitle(routerState: RouterStateSnapshot): void {
    const titleKey = this.buildTitle(routerState) || '';
    this._lastTitleKey = titleKey;
    this.applyTitle(titleKey);
  }

  private listenToLanguageChanges(): void {
    this._translocoService.langChanges$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => {
        if (this._lastTitleKey) {
          this.applyTitle(this._lastTitleKey);
        }
      });
  }

  private applyTitle(key: string): void {
    const translatedTitle = this._translationsService.translatePageTitle(key);
    this._title.setTitle(translatedTitle);
  }
}

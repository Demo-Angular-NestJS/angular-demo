/* eslint-disable @typescript-eslint/no-explicit-any */
import { APP_INITIALIZER, EnvironmentProviders, isDevMode, makeEnvironmentProviders } from '@angular/core';
import { environment } from '@env/environment';
import {
  DefaultFallbackStrategy,
  FunctionalTranspiler,
  provideTransloco,
  provideTranslocoFallbackStrategy,
  provideTranslocoInterceptor,
  provideTranslocoMissingHandler,
  provideTranslocoTranspiler,
  translocoConfig,
  TranslocoService
} from '@ngneat/transloco';
import { TranslationLanguageEnum } from 'app/enum';
import { CustomTranslocoMissingHandler } from './custom-transloco-missing-handler';
import { TemplatesTranslocoInterceptor } from './templates-transloco.interceptor';
import { TranslationsService } from '@s/common';
import { defaultLanguage } from '@constants';
import { TitleStrategy } from '@angular/router';
import { TranslationPageTitleStrategy } from './translate-page-title.strategy';

export const customTranslocoProvider = (): EnvironmentProviders => {
  return makeEnvironmentProviders([
    provideTransloco({
      config: translocoConfig({
        availableLangs: environment?.availableLangs ?? [defaultLanguage],
        defaultLang: environment?.defaultLang ?? TranslationLanguageEnum.English,
        fallbackLang: environment?.fallbackLang ?? TranslationLanguageEnum.English,
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      })
    }),
    provideTranslocoTranspiler(FunctionalTranspiler),
    provideTranslocoMissingHandler(CustomTranslocoMissingHandler),
    provideTranslocoInterceptor(TemplatesTranslocoInterceptor),
    provideTranslocoFallbackStrategy(DefaultFallbackStrategy),
    { provide: TitleStrategy, useClass: TranslationPageTitleStrategy },
    {
      provide: APP_INITIALIZER,
      deps: [TranslocoService, TranslationsService],
      useFactory: (translocoService: TranslocoService, translationLoaderService: TranslationsService) => {
        return () => {
          translationLoaderService.registerTranslations(
            'global',
            (lang: string) => import(`../../../assets/i18n/${lang}.json`),
          );

          const defaultLang = translocoService.getDefaultLang();
          translocoService.setActiveLang(defaultLang);

          return translocoService.load(defaultLang);
        };
      },
      multi: true,
    },
  ]);
};

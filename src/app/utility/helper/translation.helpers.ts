import { Provider } from '@angular/core';
import { TranslationLoaderByLangType } from '@core/translate';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { TranslationsService } from '@s/common';

export const provideTranslation = (scope: string, translationLoader: TranslationLoaderByLangType): Provider[] => [
  {
    provide: TRANSLOCO_SCOPE,
    useFactory: (translationLoaderService: TranslationsService): string => {
      translationLoaderService.registerTranslations(scope, translationLoader);
      return scope;
    },
    deps: [TranslationsService],
  },
];

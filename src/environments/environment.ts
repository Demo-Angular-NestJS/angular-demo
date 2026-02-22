import { EnvironmentModel } from '@m/environment.model';
import { TranslationLanguageEnum } from 'app/enum';

export const environment: EnvironmentModel = {
  production: false,
  baseUrl: 'http://localhost:4200',
  apiUrl: 'http://localhost:3100/api/v1',
  apiTimeoutMs: 300000,
  debounceTimeMS: 600,
  checkAuthIntervalMs: 1000 * 5,
  apiVersionHeaderKey: 'apiVersion',
  apiVersion: '1',
  baseHref: '/',
  availableLangs: [
    { id: TranslationLanguageEnum.English, label: 'English (US)' },
    { id: TranslationLanguageEnum.Spanish, label: 'Español (ES)' },
  ],
  defaultLang: TranslationLanguageEnum.English,
  fallbackLang: TranslationLanguageEnum.English,
};

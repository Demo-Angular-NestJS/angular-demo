import { LangDefinition } from '@ngneat/transloco';
import { TranslationLanguageEnum } from 'app/enum';

export interface EnvironmentModel {
    production: boolean;
    baseUrl: string;
    apiUrl: string;
    apiTimeoutMs: number;
    debounceTimeMS: number;
    checkAuthIntervalMs: number;
    apiVersionHeaderKey: string;
    apiVersion: string;
    baseHref: string;
    availableLangs: LangDefinition[];
    defaultLang: TranslationLanguageEnum;
    fallbackLang: TranslationLanguageEnum,
}

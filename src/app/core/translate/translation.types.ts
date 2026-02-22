import { Translation } from '@ngneat/transloco';
import { TranslationLanguageEnum } from 'app/enum';

export type TranslationLoaderByLangType = (lang: TranslationLanguageEnum) => Promise<Translation>;

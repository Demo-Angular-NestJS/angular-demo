import { Translation } from '@ngneat/transloco';
import { TranslationLanguageEnum } from 'app/enum';

export interface LoadTranslationResultModel {
  translation: Translation | null;
  lang: TranslationLanguageEnum;
  scope: string;
}

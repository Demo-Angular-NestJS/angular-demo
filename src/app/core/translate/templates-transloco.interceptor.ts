/* eslint-disable @typescript-eslint/no-unused-vars */
import { Translation, TranslocoInterceptor } from '@ngneat/transloco';

export class TemplatesTranslocoInterceptor implements TranslocoInterceptor {
  preSaveTranslation(translation: Translation, lang: string): Translation {
    if (Object.keys(translation).length) {
      Object.keys(translation).forEach((key) => (translation[key] = this.preSaveTranslationKey(key, translation[key] || null, lang)));
    }

    return translation;
  }

  preSaveTranslationKey(key: string, value: string, lang: string): string {
    if (typeof(value) !== 'string') {
      return '...Loading';
    }

    const date = new Date();
    return value ? value.replace('{YEAR}', `${date.getFullYear()}`) : 'loading..';
  }
}

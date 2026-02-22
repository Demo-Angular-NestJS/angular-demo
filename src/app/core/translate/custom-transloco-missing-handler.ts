import { isPlatformServer } from '@angular/common';
import { inject, isDevMode, PLATFORM_ID, Injectable } from '@angular/core';
import { TranslocoConfig, TranslocoMissingHandler } from '@ngneat/transloco';

@Injectable()
export class CustomTranslocoMissingHandler implements TranslocoMissingHandler {
  private readonly _platformId = inject(PLATFORM_ID);

  handle(key: string, config: TranslocoConfig): string {
    // Check if logging is enabled and if we are on the server (SSR)
    if (
      isDevMode() &&
      config.missingHandler?.logMissingKey &&
      isPlatformServer(this._platformId)
    ) {
      console.warn(`[Transloco] Missing translation for key: "${key}"`);
    }

    return key;
  }
}

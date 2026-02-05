import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID, provideAppInitializer } from '@angular/core';
import { CSRFService } from '@s/csrf.service';

export const provideCSFRInitializer = () => {
  return provideAppInitializer(async () => {
    const platformId = inject(PLATFORM_ID);
    const csrfService = inject(CSRFService);

    if (isPlatformBrowser(platformId)) {
      try {
        await csrfService.validateCSRFToken();
      } catch {
        return Promise.resolve();
      }
    }

    return Promise.resolve();
  });
};

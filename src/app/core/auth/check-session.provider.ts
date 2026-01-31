import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID, provideAppInitializer } from '@angular/core';
import { AuthService } from '@s/auth.service';
import { firstValueFrom } from 'rxjs';

export const provideCheckSessionInitializer = () => {
  return provideAppInitializer(async () => {
    const authService = inject(AuthService);
    const platformId = inject(PLATFORM_ID);

    if (isPlatformBrowser(platformId)) {
      // Browser: Wait for the 3s delay and the API
      try {
        await firstValueFrom(authService.checkSession());
      } catch { /* Handle error */ }
    } else {
      // Server: Don't await anything.
      // Just send the HTML shell with the splash screen inside <app-root>.
      return Promise.resolve();
    }
  });
};

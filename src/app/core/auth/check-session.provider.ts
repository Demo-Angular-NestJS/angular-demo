import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID, provideAppInitializer } from '@angular/core';
import { AuthService } from '@s/auth.service';
import { GlobalStateService } from '@s/common';
import { firstValueFrom } from 'rxjs';

export const provideCheckSessionInitializer = () => {
  return provideAppInitializer(async () => {
    const platformId = inject(PLATFORM_ID);
    const authService = inject(AuthService);
    const globalStateService = inject(GlobalStateService);

    if (isPlatformBrowser(platformId)) {
      try {
        globalStateService.isInitializing$.next(true);
        await firstValueFrom(authService.checkSession());
        globalStateService.isInitializing$.next(false);
      } catch { /* Handle error */ }
    } else {
      return Promise.resolve();
    }
  });
};

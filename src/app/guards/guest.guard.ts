import { isPlatformServer } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { defaultRoute } from '@constants';
import { AuthService } from '@s/auth.service';

export const guestGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // If on server, just let it pass so the server renders the Shell.
  // The REAL check happens 3 seconds later in the browser.
  if (isPlatformServer(platformId)) {
    return true;
  }

  const isAuth = authService.isAuthenticated();

  if (!isAuth) return true;

  const returnUrl = route.queryParams['returnUrl'] || defaultRoute;
  return router.createUrlTree([returnUrl]);
};

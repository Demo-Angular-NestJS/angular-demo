import { isPlatformServer } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { searchSignInRoute, } from '@constants';
import { AuthService } from '@s/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformServer(platformId)) {
    return true;
  }

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree([searchSignInRoute], {
    queryParams: { returnUrl: state.url }
  });
};

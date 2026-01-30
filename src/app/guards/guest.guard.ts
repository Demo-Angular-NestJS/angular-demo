import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { defaultRoute } from '@constants';
import { AuthService } from '@s/auth.service';

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return true;
  }

  // If already logged in, send them to the dashboard/home
  return router.createUrlTree([defaultRoute]);
};

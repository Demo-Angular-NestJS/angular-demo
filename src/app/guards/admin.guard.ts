import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { signInRoute } from '@constants';
import { AuthService } from '@s/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Redirect to login, but save the attempted URL to return there later
  return router.createUrlTree([`/${signInRoute}`], { queryParams: { returnUrl: state.url }});
};

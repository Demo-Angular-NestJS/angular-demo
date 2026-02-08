import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { logoutRoute, meRoute, searchSignInRoute } from '@constants';
import { AuthService } from '@s/auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const secureReq = req.clone({
    withCredentials: true
  });

  return next(secureReq).pipe(
    catchError((error) => {
      const ignoreRoutes = [logoutRoute, meRoute, searchSignInRoute];
      const isAuthPath = ignoreRoutes.some((route) => req.url.includes(route));

      if (error.status === 401 && !isAuthPath) {
        authService.logout();
        router.navigate([searchSignInRoute], {
          queryParams: { returnUrl: router.url }
        });
      }

      return throwError(() => error);
    })
  );
};

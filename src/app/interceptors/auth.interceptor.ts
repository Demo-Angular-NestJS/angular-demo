import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { searchSignInRoute } from '@constants';
import { AuthService } from '@s/auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // Clone the request to add withCredentials
  const secureReq = req.clone({
    withCredentials: true
  });

  return next(secureReq).pipe(
    catchError((error) => {
      // If the server returns 401 and it's not the login route, log out
      if (error.status === 401 && !req.url.includes(searchSignInRoute)) {
        authService.logout();
      }
      return throwError(() => error);
    })
  );
};

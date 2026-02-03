import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { logoutRoute } from '@constants';
import { AuthService } from '@s/auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const secureReq = req.clone({
    withCredentials: true
  });

  return next(secureReq).pipe(
    catchError((error) => {
      if (error.status === 401 && !req.url.includes(logoutRoute)) {
        authService.logout();
      }
      return throwError(() => error);
    })
  );
};

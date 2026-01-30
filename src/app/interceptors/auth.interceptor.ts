import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@s/auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // Solo intentamos refrescar si el usuario ya está autenticado
  // y no es la propia petición de login o refresh.
  if (authService.isAuthenticated() && !req.url.includes('/auth/refresh')) {
    authService.refreshToken().subscribe();
  }

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        authService.logout();
      }
      return throwError(() => error);
    })
  );
};

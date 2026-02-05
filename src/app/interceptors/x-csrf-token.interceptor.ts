import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CSRFService } from '@s/csrf.service';

export const csrfInterceptor: HttpInterceptorFn = (req, next) => {
  const csrfService = inject(CSRFService);
  const token = csrfService.getToken();

  if (req.url.includes('/auth/token')) {
    return next(req.clone({ withCredentials: true }));
  }

  if (token && ['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
    req = req.clone({
      setHeaders: { 'x-csrf-token': token },
      withCredentials: true
    });
  } else {
    req = req.clone({ withCredentials: true });
  }

  return next(req);
};

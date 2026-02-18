import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '@env/environment';
import { LoadingService } from '@s/common/loading.service';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  const isApiRequest = req.url.includes(environment.apiUrl);

  if (isApiRequest) {
    loadingService.show();
  }

  return next(req).pipe(
    finalize(() => {
      if (isApiRequest) {
        loadingService.hide();
      }
    })
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpInterceptorFn } from '@angular/common/http';
import { getIdempotencyRequestFingerprint } from '@u/idempotency-key.util';
import { from, Observable } from 'rxjs';
import { switchMap, finalize, shareReplay } from 'rxjs/operators';

const activeRequests = new Map<string, Observable<any>>();

export const idempotencyInterceptor: HttpInterceptorFn = (req, next) => {
  if (!['POST', 'PUT', 'PATCH'].includes(req.method)) {
    return next(req);
  }

  // Convert the Promise-based fingerprinting into an Observable stream
  return from(getIdempotencyRequestFingerprint(req)).pipe(
    switchMap((key) => {
      if (activeRequests.has(key)) {
        return activeRequests.get(key)!;
      }

      const clonedReq = req.clone({
        setHeaders: { 'Idempotency-Key': key }
      });
      const request$ = next(clonedReq).pipe(
        shareReplay(1), // shareReplay(1) ensures late subscribers get the same result, if they hit the interceptor before the first finishes
        finalize(() => activeRequests.delete(key))
      );

      activeRequests.set(key, request$);
      return request$;
    })
  );
};

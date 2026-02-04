/* eslint-disable @typescript-eslint/naming-convention */
import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { generateIdempotencyKey } from '@u/idempotency-key.util';

export const IDEMPOTENCY_KEY_TOKEN = new HttpContextToken<string>(() => '');
export const idempotencyInterceptor: HttpInterceptorFn = (req, next) => {
  if (!['POST', 'PUT', 'PATCH'].includes(req.method)) {
    return next(req);
  }

  let key = req.context.get(IDEMPOTENCY_KEY_TOKEN);

  if (!key) {
    key = generateIdempotencyKey();
    req.context.set(IDEMPOTENCY_KEY_TOKEN, key);
  }

  const clonedReq = req.clone({
    setHeaders: { 'Idempotency-Key': key }
  });

  return next(clonedReq);
};

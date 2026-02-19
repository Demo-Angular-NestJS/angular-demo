/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Type } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpStatusCode } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { searchSignInRoute } from '@constants';
import { BaseDataService } from '@data/services';
import { GlobalStateService } from '@s/common';
import { cloneDeep } from 'lodash';

export function requiredDataGuard<T extends { id?: string | number }>(
  serviceToken: Type<BaseDataService<T>>,
  forceRefresh = false
): CanActivateFn {
  return (route, state) => {
    const router = inject(Router);
    const service = inject(serviceToken);
    const globalStateService = inject(GlobalStateService);

    //Prevent send request while application is loading the bundle
    if (globalStateService.isInitializing$.value) {
      return true;
    }

    return service.loaded$.pipe(
      take(1),
      switchMap((isLoaded) => {
        if (isLoaded && !forceRefresh) {
          return of(true);
        }

        return service.getAll().pipe(
          tap((data: T[]) => {
            if (forceRefresh) {
              const freshData = data.map(item => cloneDeep(item));

              service.clearCache();
              service.addAllToCache(freshData);
              service.setLoaded(true);
            }
          }),
          map(() => true),
          catchError((err) => {
            if (err.status === HttpStatusCode.Unauthorized) {
              const urlTree = router.createUrlTree([searchSignInRoute], {
                queryParams: { returnUrl: state.url },
              });
              return of(urlTree);
            }

            return throwError(() => err);
          })
        );
      })
    );
  };
}

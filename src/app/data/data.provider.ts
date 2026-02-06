import { EnvironmentProviders, inject, Provider, isDevMode, provideAppInitializer } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEntityData, withEffects, DefaultDataServiceConfig } from '@ngrx/data';
import { reducers, metaReducers, entityConfig, defaultDataServiceConfig } from './config';
import { InitTransferService } from './transfer-services';

export const provideData = (): (Provider | EnvironmentProviders)[] => {
  const providers: (Provider | EnvironmentProviders)[] = [
    provideStore(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
      }
    }),
    provideEffects(),
    provideEntityData(entityConfig, withEffects()),
    {
      provide: DefaultDataServiceConfig,
      useValue: defaultDataServiceConfig
    },
    provideAppInitializer(() => inject(InitTransferService).init()),
  ];

  if (isDevMode()) {
    providers.push(
      provideStoreDevtools({
        maxAge: 25,
        logOnly: false,
        connectInZone: false, // Set to false for Zoneless
        trace: true,
      })
    );
  }

  return providers;
};

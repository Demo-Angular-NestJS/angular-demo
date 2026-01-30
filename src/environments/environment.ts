import { EnvironmentModel } from '@m/environment.model';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: EnvironmentModel = {
    production: false,
    apiUrl: 'http://localhost:3100/api/v1',
    apiTimeoutMs: 300000,
    debounceTimeMS: 600,
    checkAuthIntervalMs: 1000 * 5,
    apiVersionHeaderKey: 'apiVersion',
    apiVersion: '1',
    baseHref: '/',
    localStorageKeys: {
        sessionRefreshTime: 'session-refresh-time',
        sessionExpirationTime: 'session-expiration-time',
        userId: 'user-id',
        accessToken: 'access-token',
    }
};

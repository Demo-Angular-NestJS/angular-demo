import { EnvironmentModel } from '@m/environment.model';

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

export interface EnvironmentModel {
    production: boolean;
    apiUrl: string;
    apiTimeoutMs: number;
    debounceTimeMS: number;
    checkAuthIntervalMs: number;
    apiVersionHeaderKey: string;
    apiVersion: string;
    baseHref: string;
    localStorageKeys: LocalStorageKeys;
}

export interface LocalStorageKeys {
    sessionRefreshTime: string;
    sessionExpirationTime: string;
    userId: string;
    accessToken: string;
}

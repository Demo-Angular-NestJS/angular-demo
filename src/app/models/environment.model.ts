export interface EnvironmentModel {
    production: boolean;
    apiUrl: string;
    apiTimeoutMs: number;
    debounceTimeMS: number;
    checkAuthIntervalMs: number;
    apiVersionHeaderKey: string;
    apiVersion: string;
    baseHref: string;
}

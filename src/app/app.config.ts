import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideCheckSessionInitializer, provideCSFRInitializer } from '@core/auth';
import { authInterceptor } from '@interc/auth.interceptor';
import { idempotencyInterceptor } from '@interc/idempotency.interceptor';
import { csrfInterceptor } from '@interc/x-csrf-token.interceptor';
import { provideIcons } from '@core/icons/icons.provider';
import { provideData } from './data/data.provider';


export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    // Core Angular & Platform
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),

    // Networking
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor, idempotencyInterceptor, csrfInterceptor])
    ),

    // Custom App Logic / Features
    ...provideData(),
    provideIcons(),
    provideCSFRInitializer(),
    provideCheckSessionInitializer(),
  ]
};

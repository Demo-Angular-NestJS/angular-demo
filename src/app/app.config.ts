import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideCheckSessionInitializer, provideCSFRInitializer } from '@core/auth';
import { authInterceptor } from '@interc/auth.interceptor';
import { idempotencyInterceptor } from '@interc/idempotency.interceptor';
import { csrfInterceptor } from '@interc/x-csrf-token.interceptor';
import { provideIcons } from '@core/icons/icons.provider';
import { provideData } from './data/data.provider';
import { customProvideToastr } from '@core/toastr/toastr.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    customProvideToastr(),
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

import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideIcons } from '@core/icons/icons.provider';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '@interc/auth.interceptor';
import { provideCheckSessionInitializer } from '@core/auth/check-session.provider';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

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
      withInterceptors([authInterceptor])
    ),

    // Custom App Logic / Features
    provideIcons(),
    provideCheckSessionInitializer(),
  ]
};

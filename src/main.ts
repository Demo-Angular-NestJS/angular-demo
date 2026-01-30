import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { RootComponent } from '@c/root/root.component';
import { enableProdMode } from '@angular/core';
import { environment } from '@env/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(RootComponent, appConfig)
  .catch((err) => console.error(err));

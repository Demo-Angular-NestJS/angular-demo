import { EnvironmentProviders, inject, provideAppInitializer, Provider } from '@angular/core';
import { IconsService } from './icons.service';

export const provideIcons = (): Provider | EnvironmentProviders[] => {
  return [
    provideAppInitializer(() => {
      const iconsService = inject(IconsService);

      return iconsService.init();
    })
  ];
};

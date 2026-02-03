/* eslint-disable @typescript-eslint/naming-convention */
import { InjectionToken } from '@angular/core';
import { FormBaseSettingsModel } from '@m/form-base-settings.model';

export const FORM_BASE_SETTINGS = new InjectionToken<FormBaseSettingsModel>('FORM_BASE_SETTINGS', {
  providedIn: 'root',
  factory: () => ({
    watchChanges: false,
    ignoreWatchFields: [],
  })
});

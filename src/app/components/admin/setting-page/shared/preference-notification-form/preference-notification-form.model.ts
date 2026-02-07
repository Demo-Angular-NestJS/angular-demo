import { Validators } from "@angular/forms";
import { ControlInfo } from "@u/generic";

export interface PreferenceNotificationFormModel {
  enableEmailNotifications: boolean,
  enableOrderStatus: boolean,
  systemTimeZone: string,
}

export const preferenceNotificationForm: ControlInfo<PreferenceNotificationFormModel> = {
  enableEmailNotifications: {},
  enableOrderStatus: {},
  systemTimeZone: { v: '', vldtr: [Validators.required] }
};

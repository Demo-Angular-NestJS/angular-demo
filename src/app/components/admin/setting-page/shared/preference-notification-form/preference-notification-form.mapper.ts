/* eslint-disable @typescript-eslint/no-explicit-any */
import { PreferenceNotificationFormModel } from "./preference-notification-form.model";

export const mapToPreferenceNotificationFormModel = (data: any): PreferenceNotificationFormModel => ({
  enableEmailNotifications: data?.enableEmailNotifications ?? false,
  enableOrderStatus: data?.enableOrderStatus ?? false,
  systemTimeZone: data?.systemTimeZone ?? 'UTC',
});

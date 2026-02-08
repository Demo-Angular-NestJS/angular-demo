/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserProfileFormModel } from "./user-profile-form.model";

export const mapToUserProfileFormModel = (data: any): UserProfileFormModel => ({
  userName: data?.userName ?? null,
  email: data?.email ?? null,
  phoneNumber: data?.phoneNumber ?? null,
  enableEmailNotifications: data?.enableEmailNotifications ?? false,
  isProfilePublic: data?.isProfilePublic ?? false,
});

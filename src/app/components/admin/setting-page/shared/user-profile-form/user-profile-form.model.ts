import { Validators } from "@angular/forms";
import { ControlInfo } from "@u/generic";

export interface UserProfileFormModel {
  userName: string,
  email: string,
  phoneNumber: string,
  enableEmailNotifications: boolean;
  isProfilePublic: boolean;
}

export const userProfileForm: ControlInfo<UserProfileFormModel> = {
  userName: { v: '', vldtr: [Validators.required] },
  email: {},
  phoneNumber: {},
  enableEmailNotifications: {},
  isProfilePublic: {},
};

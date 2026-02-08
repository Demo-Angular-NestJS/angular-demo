import { Validators } from "@angular/forms";
import { passwordPattern } from "@constants";
import { ControlInfo } from "@u/generic";

export interface ChangePasswordFormModel {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

export const changePasswordForm: ControlInfo<ChangePasswordFormModel> = {
  currentPassword: { vldtr: [Validators.required] },
  password: { vldtr: [Validators.required, Validators.pattern(passwordPattern)] },
  confirmPassword: {},
};

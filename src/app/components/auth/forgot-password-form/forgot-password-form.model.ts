import { Validators } from "@angular/forms";
import { ControlInfo } from "@u/generic";

export interface ForgotPasswordFormModel {
  email: string;
}

export const forgotPasswordForm: ControlInfo<ForgotPasswordFormModel> = {
  email: { vldtr: [Validators.required, Validators.email] },
};

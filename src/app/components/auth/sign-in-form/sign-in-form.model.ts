import { Validators } from "@angular/forms";
import { ControlInfo } from "@u/generic";

export interface SignInFormModel {
  email: string;
  password: string;
}

export const signInForm: ControlInfo<SignInFormModel> = {
  email: { v: '', vldtr: [Validators.required, Validators.email] },
  password: { v: '', vldtr: [Validators.required] }
};

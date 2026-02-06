import { Validators } from "@angular/forms";
import { ControlInfo } from "@u/generic";

export interface RegisterFormModel {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const registerForm: ControlInfo<RegisterFormModel> = {
  userName: { v: '', vldtr: [Validators.required] },
  email: { v: '', vldtr: [Validators.required, Validators.email] },
  password: { v: '', vldtr: [Validators.required, Validators.minLength(4)] },
  confirmPassword: { v: '', vldtr: [Validators.required, Validators.minLength(4)] },
};

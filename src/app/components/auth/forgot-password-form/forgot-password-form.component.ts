import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormBaseComponent } from '@c/shared/form-base.component';
import { forgotPasswordForm, ForgotPasswordFormModel } from './forgot-password-form.model';
import { getGroup } from '@u/generic';
import { FormDefaultsModule } from '@c/shared/form-defaults.module';

@Component({
  standalone: true,
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormDefaultsModule
  ],
})
export class ForgotPasswordFormComponent extends FormBaseComponent<ForgotPasswordFormModel> {
  networkActive = input<boolean>(false);
  submitData = output<ForgotPasswordFormModel>();

  public form = getGroup(forgotPasswordForm);

  constructor() {
    super();
    this.initFormListeners();
  }

  public override onSubmit(): void {
    const value = this.validatedValue;
    if (value) {
      this.submitData.emit(value);
    }
  }
}

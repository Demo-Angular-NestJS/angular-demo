import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { FormBaseComponent } from '@c/shared/form-base.component';
import { signInForm, SignInFormModel } from './sign-in-form.model';
import { getGroup } from '@u/generic';
import { FormDefaultsModule } from '@c/shared/form-defaults.module';

@Component({
  standalone: true,
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormDefaultsModule]
})
export class SignInFormComponent extends FormBaseComponent<SignInFormModel> {
  networkActive = input<boolean>(false);
  signInEvent = output<SignInFormModel>();

  public form = getGroup<SignInFormModel>(signInForm);
  protected hidePassword = signal(true);

  constructor() {
    super();
    // Enable change tracking (if watchChanges is true in settings)
    this.initFormListeners();
  }

  public override onSubmit(): void {
    const value = this.validatedValue;
    if (value) {
      this.signInEvent.emit(value);
    }
  }

  togglePassword() {
    this.hidePassword.update(prev => !prev);
  }
}

import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { FormBaseComponent } from '@c/shared/form-base.component';
import { signInForm, SignInFormModel } from './sign-in-form.model';
import { getGroup } from '@u/generic';
import { FormDefaultsModule } from '@c/shared/form-defaults.module';
import { searchForgotPasswordRoute } from '@constants';
import { provideTranslation } from '@u/helper';
import { TranslationLanguageEnum } from 'app/enum';

@Component({
  standalone: true,
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideTranslation('signInForm', (lang: TranslationLanguageEnum) => import(`./i18n/${lang}.json`))],
  imports: [FormDefaultsModule]
})
export class SignInFormComponent extends FormBaseComponent<SignInFormModel> {
  networkActive = input<boolean>(false);
  submitData = output<SignInFormModel>();

  public form = getGroup(signInForm);
  protected hidePassword = signal(true);
  protected searchForgotPasswordRoute = searchForgotPasswordRoute;

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

  protected togglePassword() {
    this.hidePassword.update(prev => !prev);
  }
}

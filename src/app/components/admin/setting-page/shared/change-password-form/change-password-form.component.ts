/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, DestroyRef, inject, input, signal } from '@angular/core';
import { FormBaseComponent } from '@c/shared/form-base.component';
import { FormDefaultsModule } from '@c/shared/form-defaults.module';
import { getGroup } from '@u/generic';
import { changePasswordForm, ChangePasswordFormModel } from './change-password-form.model';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { provideTranslation } from '@u/helper';
import { TranslationLanguageEnum } from 'app/enum';

@Component({
  standalone: true,
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideTranslation('changePasswordForm', (lang: TranslationLanguageEnum) => import(`./i18n/${lang}.json`))],
  imports: [
    FormDefaultsModule,
  ]
})
export class ChangePasswordFormComponent extends FormBaseComponent<ChangePasswordFormModel> implements AfterViewInit {
  networkActive = input<boolean>(false);

  public form = getGroup(changePasswordForm);

  protected hideCurrentPassword = signal(true);
  protected hidePassword = signal(true);
  protected hideConfirmPassword = signal(true);
  protected passwordValue = toSignal(this.field('password').valueChanges, { initialValue: this.field('password').value });
  protected passwordStrength = computed(() => {
    const value = this.passwordValue();
    let score = 0;

    if (value.length >= 4) {
      score++;
    }
    if (/[A-Z]/.test(value)) {
      score++;
    }
    if (/[0-9]/.test(value)) {
      score++
    };

    return score;
  });

  private _destroyRef = inject(DestroyRef);
  private _cdr = inject(ChangeDetectorRef);

  constructor() {
    super();
    this.initFormListeners();
  };

  ngAfterViewInit(): void {
    this.passwordMatchValidation();
  }

  protected toggleCurrentPasswordEvent = () => this.hideCurrentPassword.update(v => !v);
  protected togglePasswordEvent = () => this.hidePassword.update(v => !v);
  protected toggleConfirmPasswordEvent = () => this.hideConfirmPassword.update(v => !v);

  private passwordMatchValidation(): void {
    const currentPassword = this.field('currentPassword');
    const password = this.field('password');
    const confirm = this.field('confirmPassword');

    combineLatest([currentPassword.valueChanges, password.valueChanges])
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(([cPass, pass]) => {
        if (cPass === pass && cPass.length > 0) {
          password.setErrors({ ...confirm.errors, mismatch: true });
        } else {
          const errors = password.errors;
          if (errors) {
            delete errors['mismatch'];
            password.setErrors(Object.keys(errors).length ? errors : null);
          }
        }
        this._cdr.markForCheck();
      });

    combineLatest([password.valueChanges, confirm.valueChanges])
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(([pass, conf]) => {
        if (pass !== conf && conf.length > 0) {
          confirm.setErrors({ ...confirm.errors, mismatch: true });
        } else {
          const errors = confirm.errors;
          if (errors) {
            delete errors['mismatch'];
            confirm.setErrors(Object.keys(errors).length ? errors : null);
          }
        }
        this._cdr.markForCheck();
      });
  }
}

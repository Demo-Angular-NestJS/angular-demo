import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, input, output, signal } from '@angular/core';
import { FormBaseComponent } from '@c/shared/form-base.component';
import { getGroup } from '@u/generic';
import { FormDefaultsModule } from '@c/shared/form-defaults.module';
import { registerForm, RegisterFormModel } from './register-form.model';
import { combineLatest, debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserHelperService } from '@s/user-helper.service';
import { DEBOUNCE_TIME_MS } from '@constants';

@Component({
  standalone: true,
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormDefaultsModule]
})
export class RegisterFormComponent extends FormBaseComponent<RegisterFormModel> implements AfterViewInit {
  networkActive = input<boolean>(false);
  errorMessage = input<string | null>(null);
  submitData = output<RegisterFormModel>();

  public form = getGroup<RegisterFormModel>(registerForm);

  protected hidePassword = signal(true);
  protected hideConfirmPassword = signal(true);

  private _destroyRef = inject(DestroyRef);
  private _userHelperService = inject(UserHelperService);
  private _cdr = inject(ChangeDetectorRef);

  constructor() {
    super();
    this.initFormListeners();
  }

  ngAfterViewInit(): void {
    this.alreadyExistValidation();
    this.passwordMatchValidation();
  }

  public override onSubmit(): void {
    const value = this.validatedValue;
    if (value) {
      this.submitData.emit(value);
    }
  }

  protected togglePasswordEvent = () => this.hidePassword.update(v => !v);
  protected toggleConfirmPasswordEvent = () => this.hideConfirmPassword.update(v => !v);

  private alreadyExistValidation(): void {
    const ctrlUserName = this.field('userName');
    const ctrlEmail = this.field('email');

    ctrlUserName.valueChanges.pipe(
      debounceTime(DEBOUNCE_TIME_MS),
      distinctUntilChanged(),
      filter(v => !!v && !ctrlUserName.hasError('required')),
      tap(() => {
        ctrlUserName.setErrors({ checking: true });
        this._cdr.markForCheck();
      }),
      switchMap((userName) => this._userHelperService.exists({ userName })),
      takeUntilDestroyed(this._destroyRef)
    ).subscribe({
      next: (resp) => {
        ctrlUserName.setErrors(resp?.userNameExist ? { alreadyExists: true } : null);
        this._cdr.markForCheck();
      },
      error: () => {
        ctrlUserName.setErrors({ serverError: true });
        this._cdr.markForCheck();
      }
    });

    ctrlEmail.valueChanges.pipe(
      debounceTime(DEBOUNCE_TIME_MS),
      distinctUntilChanged(),
      filter((v) => !!v && !ctrlEmail.hasError('required') && !ctrlEmail.hasError('email')),
      tap(() => {
        ctrlEmail.setErrors({ checking: true });
        this._cdr.markForCheck();
      }),
      switchMap((email) => this._userHelperService.exists({ email })),
      takeUntilDestroyed(this._destroyRef)
    ).subscribe({
      next: (resp) => {
        ctrlEmail.setErrors(resp?.emailExist ? { alreadyExists: true } : null);
        this._cdr.markForCheck();
      },
      error: () => {
        ctrlEmail.setErrors({ serverError: true });
        this._cdr.markForCheck();
      }
    });
  }

  private passwordMatchValidation(): void {
    const password = this.field('password');
    const confirm = this.field('confirmPassword');

    combineLatest([password.valueChanges, confirm.valueChanges])
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(([pass, conf]) => {
        if (pass !== conf && conf.length > 0) {
          confirm.setErrors({ ...confirm.errors, mismatch: true });
        } else {
          // Remove only the mismatch error if it exists
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

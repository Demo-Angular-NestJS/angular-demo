import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ForgotPasswordFormComponent, ForgotPasswordFormModel } from '@c/auth';
import { BaseComponent } from '@c/shared/base.component';
import { searchSignInRoute } from '@constants';
import { UserHelperService } from '@s/user-helper.service';

@Component({
  standalone: true,
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    ForgotPasswordFormComponent,
  ]
})
export class ForgotPasswordComponent extends BaseComponent {
  @ViewChild(ForgotPasswordFormComponent) forgotPasswordForm!: ForgotPasswordFormComponent;

  protected searchSignInRoute = searchSignInRoute;

  private _userHelperService = inject(UserHelperService);

  protected sendInstructionsEvent(form: ForgotPasswordFormModel): void {
    if (this.networkActive() || !form) {
      return;
    }

    this.networkActive.set(true);
    this._userHelperService.sendTempPassword(form.email).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.toastr.success('An email was send succesfully, please check your email account and follow instructions');
        this.networkActive.set(false);
        this.forgotPasswordForm.resetForm();
      },
      error: () => {
        this.toastr.error('An error ocurred while sending the email, please try later');
        this.networkActive.set(false);
      }
    });
  }
}

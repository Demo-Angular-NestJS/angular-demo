import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ForgotPasswordFormComponent, ForgotPasswordFormModel } from '@c/auth';
import { BaseComponent } from '@c/shared/base.component';
import { searchSignInRoute } from '@constants';
import { TranslocoModule } from '@ngneat/transloco';
import { UserHelperService } from '@s/user-helper.service';
import { provideTranslation } from '@u/helper';
import { TranslationLanguageEnum } from 'app/enum';

@Component({
  standalone: true,
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideTranslation('forgotPasswordPage', (lang: TranslationLanguageEnum) => import(`./i18n/${lang}.json`))],
  imports: [
    CommonModule,
    RouterModule,
    TranslocoModule,
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
        const message = this.translocoService.translate('forgotPasswordPage.An email was send succesfully message');
        this.toastr.success(message);
        this.networkActive.set(false);
        this.forgotPasswordForm.resetForm();
      },
      error: () => {
        const message = this.translocoService.translate('forgotPasswordPage.An error ocurred message');
        this.toastr.error(message);
        this.networkActive.set(false);
      }
    });
  }
}

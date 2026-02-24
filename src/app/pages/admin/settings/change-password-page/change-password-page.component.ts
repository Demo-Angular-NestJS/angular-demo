import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { PageBreadCrumbModel } from '@m/page-bread-crumb.model';
import { BaseComponent } from '@c/shared/base.component';
import { ChangePasswordFormComponent } from '@c/admin';
import { ChangePasswordRequestModel } from '@m/request/change-password.request';
import { UserHelperService } from '@s/user-helper.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { searchSettingRoute } from '@constants';
import { provideTranslation } from '@u/helper';
import { TranslationLanguageEnum } from 'app/enum';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  standalone: true,
  selector: 'app-change-password-page',
  templateUrl: './change-password-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideTranslation('changePasswordPage', (lang: TranslationLanguageEnum) => import(`./i18n/${lang}.json`))],
  imports: [
    CommonModule,
    TranslocoModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ChangePasswordFormComponent,
  ]
})
export class ChangePasswordPageComponent extends BaseComponent {
  @ViewChild(ChangePasswordFormComponent) changePasswordForm!: ChangePasswordFormComponent;

  private _userHelperService = inject(UserHelperService);

  constructor() {
    super();
    this.adminLayout?.breadCrumbs.set(breadCrumbs);
  }

  protected changePasswordEvent(): void {
    if (this.networkActive() || !this.changePasswordForm.validatedValue) {
      return;
    }

    const formValue = this.changePasswordForm.validatedValue;
    const request: ChangePasswordRequestModel = {
      currentPassword: formValue.currentPassword,
      newPassword: formValue.password,
    };

    this.networkActive.set(true);
    this._userHelperService.changePassowrd(request).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        const message = this.translocoService.translate('changePasswordPage.The password has been change successfully');
        this.toastr.success(message);
        this.networkActive.set(false);
        this.changePasswordForm.resetForm();
      },
      error: (err: HttpErrorResponse) => {
        const defaultMessage = this.translocoService.translate('changePasswordPage.An error ocurrend changing the password');
        this.toastr.error(err?.error?.message ?? defaultMessage);
        this.networkActive.set(false);
      },
    })
  }

  protected cancelEvent(): void {
    this.router.navigate([searchSettingRoute]);
  }
}

const breadCrumbs: PageBreadCrumbModel[] = [
  { title: 'global.pageTitles.Settings', url: null, svgIcon: 'settings' },
  { title: 'global.pageTitles.Change Password', url: null, svgIcon: 'security_padlock' },
];

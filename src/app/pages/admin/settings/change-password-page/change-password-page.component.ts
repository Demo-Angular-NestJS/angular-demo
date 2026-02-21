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

@Component({
  standalone: true,
  selector: 'app-change-password-page',
  templateUrl: './change-password-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
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
        this.networkActive.set(false);
        this.toastr.success('The password has been change succesfully');
        this.changePasswordForm.resetForm();
      },
      error: (err: HttpErrorResponse) => {
        this.networkActive.set(false);
        this.toastr.error(err?.error?.message ?? 'An error ocurrend changing the password');
      },
    })
  }

  protected cancelEvent(): void {
    this.router.navigate([searchSettingRoute]);
  }
}

const breadCrumbs: PageBreadCrumbModel[] = [
  { title: 'Settings', url: null, svgIcon: 'settings' },
  { title: 'Change Password', url: null, svgIcon: 'security_padlock' },
];

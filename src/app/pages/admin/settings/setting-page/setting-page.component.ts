import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PageBreadCrumbModel } from '@m/page-bread-crumb.model';
import { PropInitialsModule } from 'app/pipe';
import { PreferenceNotificationFormComponent, PreferenceNotificationFormModel } from '@c/admin';
import { UserConfigurationModel } from '@m/class';
import { searchChangePasswordRoute, searchProfileRoute } from '@constants';
import { RouterModule } from '@angular/router';
import { BaseComponent } from '@c/shared/base.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-setting-page',
  templateUrl: './setting-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    PropInitialsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    PreferenceNotificationFormComponent,
  ]
})
export class SettingPageComponent extends BaseComponent {
  @ViewChild(PreferenceNotificationFormComponent) preferenceNotificationForm!: PreferenceNotificationFormComponent;

  protected currentPrefeNotifFormData = toSignal(this.currentUserConfigService.current$, { initialValue: null });
  protected searchProfileRoute = searchProfileRoute;
  protected searchChangePasswordRoute = searchChangePasswordRoute;

  constructor() {
    super();
    this.adminLayout?.breadCrumbs.set(breadCrumbs);
  }

  protected saveSettings(data: PreferenceNotificationFormModel) {
    const updateData: Partial<UserConfigurationModel> = {
      id: this.currentPrefeNotifFormData()?.id ?? '',
      ...data,
    };

    this.currentUserConfigService.update(updateData).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      error: () => {
        this.toastr.warning('An error occurred while updating your settings, please update the page and try again.');
        this.preferenceNotificationForm.data = this.currentPrefeNotifFormData() || null;
      }
    });
  }
}

const breadCrumbs: PageBreadCrumbModel[] = [
  { title: 'Settings', url: null, svgIcon: 'settings' },
];

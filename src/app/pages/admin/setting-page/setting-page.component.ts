import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AdminLayoutComponent } from '@c/layout';
import { CurrentUserConfigurationService, CurrentUserService } from '@data/services';
import { PageBreadCrumbModel } from '@m/page-bread-crumb.model';
import { PropInitialsModule } from 'app/pipe';
import { DisableFormDirectiveModule } from "@d/disable-form-directive";
import { PreferenceNotificationFormComponent, PreferenceNotificationFormModel } from '@c/admin';
import { UserConfigurationModel } from '@m/class';

@Component({
  standalone: true,
  selector: 'app-setting-page',
  templateUrl: './setting-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    PropInitialsModule,
    MatFormFieldModule,
    MatInputModule,
    DisableFormDirectiveModule,
    PreferenceNotificationFormComponent,
  ]
})
export class SettingPageComponent implements OnDestroy {
  @ViewChild(PreferenceNotificationFormComponent) preferenceNotificationForm!: PreferenceNotificationFormComponent;

  protected currentUserService = inject(CurrentUserService);
  protected currentUserConfigService = inject(CurrentUserConfigurationService);
  protected adminLayout = inject(AdminLayoutComponent);

  protected currentPrefeNotifFormData = toSignal(this.currentUserConfigService.current$, { initialValue: null });
  protected currentUser = toSignal(this.currentUserService.current$, { initialValue: null });

  private _destroyRef = inject(DestroyRef);

  constructor() {
    this.adminLayout.breadCrumbs.set(defaultBreadCrumbs);
  }

  ngOnDestroy(): void {
    this.adminLayout.breadCrumbs.set([]);
  }

  protected saveSettings(data: PreferenceNotificationFormModel) {
    const updateData: Partial<UserConfigurationModel> = {
      id: this.currentPrefeNotifFormData()?.id ?? '',
      ...data,
    };

    this.currentUserConfigService.update(updateData).pipe(
      // 1. Ensure the observable actually errors out on HTTP failure
      // Note: Some BaseTransferServices handle this, but NgRx Data
      // collections might need explicit handling if you've overridden logic.
      takeUntilDestroyed(this._destroyRef)
    ).subscribe({
      error: () => {
        this.preferenceNotificationForm.data = this.currentPrefeNotifFormData() || null;
      }
    });
  }
}

const defaultBreadCrumbs: PageBreadCrumbModel[] = [
  { title: 'Settings', url: null, svgIcon: 'settings' },
];

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserProfileFormComponent } from '@c/admin';
import { BaseComponent } from '@c/shared/base.component';
import { UserConfigurationModel, UserModel } from '@m/class';
import { PageBreadCrumbModel } from '@m/page-bread-crumb.model';
import { PropInitialsModule } from 'app/pipe';
import { combineLatest } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    PropInitialsModule,
    UserProfileFormComponent,
  ],
})
export class ProfilePageComponent extends BaseComponent {
  @ViewChild(UserProfileFormComponent) userProfileForm!: UserProfileFormComponent;

  protected userProfileData = computed(() => ({ ...this.currentUser(), ...this.currentUserConfig() }));

  constructor() {
    super();
    this.adminLayout?.breadCrumbs.set(defaultBreadCrumbs);
  }

  protected saveDataEvent(): void {
    const formData = this.userProfileForm.validatedValue;

    if (this.networkActive() || !formData) {
      return;
    }

    const userData = new UserModel({ ...formData, id: this.currentUser().id ?? '' });
    const userConfigData = new UserConfigurationModel({ ...formData, id: this.currentUserConfig()?.id ?? '' });

    this.networkActive.set(true);
    combineLatest([
      this.currentUserService.update(userData),
      this.currentUserConfigService.update(userConfigData),
    ]).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.networkActive.set(false);
        this.toastr.success('Your information has been update successfully!');
      },
      error: () => {
        this.networkActive.set(false);
        this.toastr.warning('An error occurred while updating your information, please update the page and try again.');
      },
    });
  }

  protected restoreDataEvent(): void {
    this.userProfileForm.data = this.userProfileData();
  }
}

const defaultBreadCrumbs: PageBreadCrumbModel[] = [
  { title: 'Settings', url: null, svgIcon: 'settings' },
  { title: 'Profile', url: null, matIcon: 'account_circle' },
];

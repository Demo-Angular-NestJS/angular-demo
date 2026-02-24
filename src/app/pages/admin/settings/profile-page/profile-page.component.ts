import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserProfileFormComponent } from '@c/admin';
import { BaseComponent } from '@c/shared/base.component';
import { searchSettingRoute } from '@constants';
import { UserConfigurationModel, UserModel } from '@m/class';
import { PageBreadCrumbModel } from '@m/page-bread-crumb.model';
import { TranslocoModule } from '@ngneat/transloco';
import { provideTranslation } from '@u/helper';
import { TranslationLanguageEnum } from 'app/enum';
import { PropInitialsModule } from 'app/pipe';
import { combineLatest } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideTranslation('profilePage', (lang: TranslationLanguageEnum) => import(`./i18n/${lang}.json`))],
  imports: [
    CommonModule,
    TranslocoModule,
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
        this.toastr.success(this.translocoService.translate('profilePage.Your information has been updated successfully'));
      },
      error: () => {
        this.networkActive.set(false);
        this.toastr.warning(this.translocoService.translate('profilePage.An error occurred while updating message'));
      },
    });
  }

  protected restoreDataEvent(): void {
    this.userProfileForm.data = this.userProfileData();
  }
}

const defaultBreadCrumbs: PageBreadCrumbModel[] = [
  { title: 'global.pageTitles.Settings', url: searchSettingRoute, svgIcon: 'settings' },
  { title: 'global.pageTitles.Profile', url: null, matIcon: 'account_circle' },
];

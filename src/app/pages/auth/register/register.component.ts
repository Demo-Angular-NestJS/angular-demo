import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { RegisterFormComponent, RegisterFormModel } from '@c/auth';
import { BaseComponent } from '@c/shared/base.component';
import { searchSignInRoute } from '@constants';
import { UserModel } from '@m/class';
import { TranslocoModule } from '@ngneat/transloco';
import { UserHelperService } from '@s/user-helper.service';
import { provideTranslation } from '@u/helper';
import { TranslationLanguageEnum } from 'app/enum';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideTranslation('registerPage', (lang: TranslationLanguageEnum) => import(`./i18n/${lang}.json`))],
  imports: [
    CommonModule,
    RouterModule,
    TranslocoModule,
    MatIconModule,
    RegisterFormComponent,
  ]
})
export class RegisterComponent extends BaseComponent {
  protected searchSignInRoute = searchSignInRoute;

  private _userHelperService = inject(UserHelperService);

  protected registerEvent(value: RegisterFormModel): void {
    const user = new UserModel(value);

    this.networkActive.set(true);
    this._userHelperService.register(user).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.toastr.success(this.translocoService.translate('registerPage.Your account has been created message'));
        this.networkActive.set(false);
        this.router.navigate([searchSignInRoute]);
      },
      error: () => {
        this.toastr.error(this.translocoService.translate('registerPage.An error occurred message'));
        this.networkActive.set(false);
      }
    });
  }
}

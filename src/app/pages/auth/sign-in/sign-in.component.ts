import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { defaultRoute, searchHomeRoute, searchRegisterRoute } from '@constants';
import { AuthService } from '@s/auth.service';
import { SignInFormComponent, SignInFormModel } from '@c/auth';
import { BaseComponent } from '@c/shared/base.component';
import { TranslocoModule } from '@ngneat/transloco';
import { provideTranslation } from '@u/helper';
import { TranslationLanguageEnum } from 'app/enum';

@Component({
  standalone: true,
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideTranslation('signInPage', (lang: TranslationLanguageEnum) => import(`./i18n/${lang}.json`))],
  imports: [
    CommonModule,
    RouterModule,
    TranslocoModule,
    SignInFormComponent,
  ]
})
export class SignInComponent extends BaseComponent {
  protected searchHomeRoute = searchHomeRoute;
  protected searchRegisterRoute = searchRegisterRoute;

  private _authService = inject(AuthService);

  protected signInEvent(event: SignInFormModel): void {
    this.networkActive.set(true);
    this._authService.login(event).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'];
        this.router.navigate([returnUrl || defaultRoute]);
        this.networkActive.set(false);
      },
      error: (err) => {
        this.networkActive.set(false);
        const errorMessage = err?.error?.message ?? 'An error occurred, please try again';
        this.toastr.error(this.translocoService.translate(`global.generalErrors.${errorMessage}`));
      }
    });
  }
}

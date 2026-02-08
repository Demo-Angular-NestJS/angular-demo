import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { defaultRoute, searchHomeRoute, searchRegisterRoute } from '@constants';
import { AuthService } from '@s/auth.service';
import { SignInFormComponent, SignInFormModel } from '@c/auth';
import { BaseComponent } from '@c/shared/base.component';

@Component({
  standalone: true,
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
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
        this.toastr.error(err?.error?.message ?? 'something was wrong');
      }
    });
  }
}

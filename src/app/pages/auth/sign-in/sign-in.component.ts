import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { defaultRoute, searchHomeRoute, searchRegisterRoute } from '@constants';
import { AuthService } from '@s/auth.service';
import { SignInFormComponent, SignInFormModel } from '@c/auth';

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
export class SignInComponent {
  @ViewChild(SignInFormComponent) signInForm!: SignInFormComponent;

  protected networkActive = signal(false);
  protected errorMessage = signal<string | null>(null);
  protected searchHomeRoute = searchHomeRoute;
  protected searchRegisterRoute = searchRegisterRoute;

  //#region Service Injection
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  //#endregion

  protected signInEvent(event: SignInFormModel): void {
    this.errorMessage.set(null);
    this.networkActive.set(true);
    this._authService.login(event).subscribe({
      next: () => {
        const returnUrl = this._route.snapshot.queryParams['returnUrl'];
        this._router.navigate([returnUrl || defaultRoute]);
        this.networkActive.set(false);
      },
      error: (err) => {
        this.networkActive.set(false);
        this.errorMessage.set(err?.error?.message ?? 'something was wrong');
      }
    });
  }
}

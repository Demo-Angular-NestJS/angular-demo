import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RegisterFormComponent, RegisterFormModel } from '@c/auth';
import { searchSignInRoute } from '@constants';
import { UserModel } from '@m/class';
import { UserHelperService } from '@s/user-helper.service';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    RegisterFormComponent,
  ]
})
export class RegisterComponent {
  protected networkActive = signal(false);
  protected errorMessage = signal<string | null>(null);

  protected searchSignInRoute = searchSignInRoute;

  // //#region Service Injection
  private _userHelperService = inject(UserHelperService);
  private _router = inject(Router);
  // //#endregion

  protected registerEvent(value: RegisterFormModel): void {
    const user = new UserModel(value);

    this.errorMessage.set(null);
    this.networkActive.set(true);
    this._userHelperService.register(user).subscribe({
      next: () => {
        this._router.navigate([searchSignInRoute]);
        this.networkActive.set(false);
      },
      error: (err) => {
        this.networkActive.set(false);
        this.errorMessage.set(err?.error?.message ?? 'something was wrong registering the account');
      }
    });
  }
}

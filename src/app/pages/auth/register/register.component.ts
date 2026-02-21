import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { RegisterFormComponent, RegisterFormModel } from '@c/auth';
import { BaseComponent } from '@c/shared/base.component';
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
        this.toastr.success('Your account has been created succesfully, login now an enjoy the expierence!.');
        this.networkActive.set(false);
        this.router.navigate([searchSignInRoute]);
      },
      error: (err) => {
        this.toastr.error(err?.error?.message ?? 'something was wrong registering the account');
        this.networkActive.set(false);
      }
    });
  }
}

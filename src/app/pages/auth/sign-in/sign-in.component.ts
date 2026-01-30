import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { searchHomeRoute } from '@constants';
import { AuthService } from '@s/auth.service';

@Component({
  standalone: true,
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
  ]
})
export class SignInComponent {
  //#region Variables
  protected searchHomeRoute = searchHomeRoute;
  //#endregion

  //#region Service Injection
  private _authService = inject(AuthService);
  private _router = inject(Router);
  //#endregion


  protected signInEvent(event: Event): void {
    // event.preventDefault(); // Stop the reload
    // this._router.navigate([searchHomeRoute]);

    this._authService.login({
      email: 'judethc82@gmail.com',
      password: 'testFornow',
    }).subscribe({
      next: () => {
        // El AuthService ya maneja la redirección al /home o /admin
        // this.isLoading.set(false);
      },
      error: (err) => {
        // this.isLoading.set(false);
        // this.errorMessage.set('Credenciales inválidas o error de servidor');
        console.error('Login error:', err);
      }
    });
  }
}

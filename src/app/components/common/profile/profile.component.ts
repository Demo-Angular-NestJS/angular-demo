import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, signal, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { signInRoute } from '@constants';
import { AuthService } from '@s/auth.service';

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatIconModule,
  ]
})
export class ProfileComponent {
  @ViewChild('profileContainer') profileContainer!: ElementRef;

  protected isProfileOpen = signal(false);

  private _authService = inject(AuthService);
  private _router = inject(Router);

  @HostListener('document:click', ['$event'])
  clickout(event: PointerEvent | MouseEvent) {
    // Si el click fue fuera del contenedor, cerramos el dropdown
    if (this.isProfileOpen() && !this.profileContainer.nativeElement.contains(event.target)) {
      this.isProfileOpen.set(false);
    }
  }

  protected toggleProfileEvent() {
    this.isProfileOpen.set(!this.isProfileOpen());
  }

  protected signOutEvent(): void {
    this._authService.logout();
    this._router.navigate([`/${signInRoute}`]);
  }
}

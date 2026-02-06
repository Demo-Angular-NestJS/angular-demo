import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, signal, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { searchSettingRoute, signInRoute } from '@constants';
import { CurrentUserService } from '@data/services';
import { AuthService } from '@s/auth.service';
import { PropInitialsModule } from 'app/pipe';

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    PropInitialsModule,
  ]
})
export class ProfileComponent {
  @ViewChild('profileContainer') profileContainer!: ElementRef;

  protected authService = inject(AuthService);
  protected currentUserService = inject(CurrentUserService);
  protected router = inject(Router);

  protected isProfileOpen = signal(false);
  protected currentUser = toSignal(this.currentUserService.current$, { initialValue: null });
  protected searchSettingRoute = searchSettingRoute;

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
    this.authService.logout();
    this.router.navigate([`/${signInRoute}`]);
  }
}

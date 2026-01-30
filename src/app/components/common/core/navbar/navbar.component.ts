import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, signal, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { signInRoute } from '@constants';
import { GlobalStateService } from '@s/common';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatIconModule,
  ]
})
export class NavbarComponent {
  @ViewChild('searchContainer') searchContainer!: ElementRef;
  @ViewChild('notifContainer') notifContainer!: ElementRef;
  @ViewChild('profileContainer') profileContainer!: ElementRef;

  //#region Variables
  protected isSearchOpen = signal(false);
  protected isNotificationsOpen = signal(false);
  protected isProfileOpen = signal(false);
  protected searchResults = signal(searchResultData);
  protected notifications = signal(notificationData);

  protected searchQuery = '';
  //#endregion

  //#region Service Injection
  protected globalStateService = inject(GlobalStateService);
  private _router = inject(Router);
  //#endregion

  @HostListener('document:click', ['$event'])
  clickout(event: PointerEvent | MouseEvent) {
    // Si el click fue fuera del contenedor del perfil, cerramos el dropdown
    if (this.isSearchOpen() && !this.searchContainer.nativeElement.contains(event.target)) {
      this.isSearchOpen.set(false);
    }

    if (this.isNotificationsOpen() && !this.notifContainer.nativeElement.contains(event.target)) {
      this.isNotificationsOpen.set(false);
    }

    if (this.isProfileOpen() && !this.profileContainer.nativeElement.contains(event.target)) {
      this.isProfileOpen.set(false);
    }
  }

  protected onSearchFocusEvent() {
    this.isSearchOpen.set(true);
  }

  protected toggleMenuEvent() {
    this.globalStateService.isAsidebarOpen$.next(
      !this.globalStateService.isAsidebarOpen$.value
    );
  }

  protected toggleNotificationsEvent() {
    this.isNotificationsOpen.set(!this.isNotificationsOpen());
  }

  protected toggleProfileEvent() {
    this.isProfileOpen.set(!this.isProfileOpen());
  }

  protected signOutEvent(event: Event): void {
    event.preventDefault();
    this._router.navigate([`/${signInRoute}`]);
  }
}

const searchResultData = [
  { name: 'LEGO Star Wars Millennium Falcon', category: 'Construcción', price: 159.99, img: '🚀' },
  { name: 'Oso de Peluche Gigante', category: 'Peluches', price: 45.00, img: '🧸' },
  { name: 'Coche de Control Remoto', category: 'Vehículos', price: 89.90, img: '🏎️' }
];
const notificationData = [
  { id: 1, text: '¡Tu pedido de LEGO está en camino!', time: 'Hace 2 min', read: false, icon: '🚚' },
  { id: 2, text: 'Juan te envió un regalo', time: 'Hace 1 hora', read: false, icon: '🎁' },
  { id: 3, text: 'Nueva oferta: 20% en Peluches', time: 'Ayer', read: true, icon: '🧸' }
];

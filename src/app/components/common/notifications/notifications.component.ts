import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, signal, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { provideTranslation } from '@u/helper';
import { TranslationLanguageEnum } from 'app/enum';

@Component({
  standalone: true,
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideTranslation('notificationSection', (lang: TranslationLanguageEnum) => import(`./i18n/${lang}.json`))],
  imports: [
    CommonModule,
    TranslocoModule,
    MatIconModule,
  ]
})
export class NotificationsComponent {
  @ViewChild('notifContainer') notifContainer!: ElementRef;

  protected isNotificationsOpen = signal(false);
  protected notifications = signal(notificationData);

  @HostListener('document:click', ['$event'])
  clickout(event: PointerEvent | MouseEvent) {
    // Si el click fue fuera del contenedor, cerramos el dropdown
    if (this.isNotificationsOpen() && !this.notifContainer.nativeElement.contains(event.target)) {
      this.isNotificationsOpen.set(false);
    }
  }

  protected toggleNotificationsEvent() {
    this.isNotificationsOpen.set(!this.isNotificationsOpen());
  }
}

const notificationData = [
  { id: 1, text: '¡Tu pedido de LEGO está en camino!', time: 'Hace 2 min', read: false, icon: '🚚' },
  { id: 2, text: 'Juan te envió un regalo', time: 'Hace 1 hora', read: false, icon: '🎁' },
  { id: 3, text: 'Nueva oferta: 20% en Peluches', time: 'Ayer', read: true, icon: '🧸' }
];

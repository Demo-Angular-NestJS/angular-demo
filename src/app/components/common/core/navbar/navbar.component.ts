import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NotificationsComponent } from '@c/common/notifications';
import { ProfileComponent } from '@c/common/profile';
import { SearchBarComponent } from '@c/common/search-bar';
import { GlobalStateService } from '@s/common';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatIconModule,
    ProfileComponent,
    NotificationsComponent,
    SearchBarComponent,
  ]
})
export class NavbarComponent {
  protected globalStateService = inject(GlobalStateService);

  protected toggleMenuEvent() {
    this.globalStateService.isAsidebarOpen$.next(
      !this.globalStateService.isAsidebarOpen$.value
    );
  }
}

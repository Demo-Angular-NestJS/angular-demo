import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { AsideComponent, BreadCrumbsComponent, FooterComponent, NavbarComponent } from '@c/common';
import { PageBreadCrumbModel } from '@m/page-bread-crumb.model';
import { GlobalStateService } from '@s/common';


@Component({
  standalone: true,
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    AsideComponent,
    BreadCrumbsComponent,
    FooterComponent,
    MatIconModule,
  ],
})
export class AdminLayoutComponent {
  //#region Variables
  public breadCrumbs = signal<PageBreadCrumbModel[]>([]);
  //#endregion

  //#region Service Injection
  protected globalStateService = inject(GlobalStateService);
  //#endregion

  protected toggleMenuEvent(): void {
    this.globalStateService.isAsidebarOpen$.next(
      !this.globalStateService.isAsidebarOpen$.value
    );
  }
}

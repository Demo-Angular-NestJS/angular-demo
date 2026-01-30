import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { searchFavoriteRoute, searchHomeRoute, searchMyPurchaseRoute, searchSettingRoute, searchToyRoute } from '@constants';
import { GlobalStateService } from '@s/common';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
  ],
})
export class AsideComponent implements OnInit, OnDestroy {
  //#region Variables
  protected isAsidebarOpen = signal(false);
  protected currentRoute = signal<string | null>(null);

  protected searchHomeRoute = searchHomeRoute;
  protected searchToyRoute = searchToyRoute;
  protected searchFavoriteRoute = searchFavoriteRoute;
  protected searchMyPurchaseRoute = searchMyPurchaseRoute;
  protected searchSettingRoute = searchSettingRoute;

  private _destroy$ = new Subject<void>();
  //#endregion

  //#region Service Injection
  protected globalStateService = inject(GlobalStateService);
  private _router = inject(Router);
  //#endregion

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngOnInit(): void {
    this.globalStateService.isAsidebarOpen$.pipe(takeUntil(this._destroy$)).subscribe((v) => {
      this.isAsidebarOpen.set(v);
    });

    this.currentRoute.set((this._router.url || '').split('?')[0].split('#')[0]);
    this._router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      takeUntil(this._destroy$)
    ).subscribe((event: NavigationEnd) => {
      const urlWithoutParams = event.urlAfterRedirects.split('?')[0].split('#')[0];
      this.currentRoute.set(urlWithoutParams)
    });
  }

  protected closeAsidebar(): void {
    this.globalStateService.isAsidebarOpen$.next(false);
  }
}

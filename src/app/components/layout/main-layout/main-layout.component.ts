import { ChangeDetectionStrategy, Component, inject, OnDestroy, signal } from '@angular/core';
import { MainLayoutType } from './main-layout.types';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { EmptyLayoutComponent } from '../empty-layout';
import { AuthLayoutComponent } from '../auth-layout';
import { AdminLayoutComponent } from '../admin-layout';

@Component({
  standalone: true,
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EmptyLayoutComponent, AuthLayoutComponent, AdminLayoutComponent]
})
export class MainLayoutComponent implements OnDestroy {
  protected layout$ = signal<MainLayoutType>('empty');

  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);

  private _destroy$ = new Subject<void>();

  constructor() {
    this._router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      takeUntil(this._destroy$)
    ).subscribe(() => this.updateLayout())
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private updateLayout(): void {
    // Get the current activated route
    let route = this._activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }

    // 2. Get the query parameter from the current route and
    // set the layout and save the layout to the config
    const layoutFromQueryParam = route.snapshot.queryParamMap.get('layout') as MainLayoutType;
    if (layoutFromQueryParam) {
      this.layout$.set(layoutFromQueryParam);
      // if (this.config) {
      //   this.config.layout = layoutFromQueryParam;
      // }
    }

    const paths = route.pathFromRoot;
    paths.forEach((path) => {
      // Check if there is a 'layout' data
      if (path.routeConfig && path.routeConfig.data && path.routeConfig.data['layout']) {
        // Set the layout
        this.layout$.set(path.routeConfig.data['layout']);
      }
    });
  }
}

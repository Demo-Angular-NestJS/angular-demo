import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { AdminLayoutComponent } from '@c/layout';
import { PageBreadCrumbModel } from '@m/page-bread-crumb.model';

@Component({
  standalone: true,
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
  ],
})
export class HomePageComponent implements OnDestroy {
  //#region Service and injectables
  protected adminLayout = inject(AdminLayoutComponent);
  //#endregion

  constructor() {
    this.adminLayout.breadCrumbs.set(breadCrumbs);
  }

  ngOnDestroy(): void {
      this.adminLayout.breadCrumbs.set([]);
  }
}

const breadCrumbs: PageBreadCrumbModel[] = [
  { title: 'Home', url: null, svgIcon: 'home' },
  { title: 'Welcome', url: null }
];

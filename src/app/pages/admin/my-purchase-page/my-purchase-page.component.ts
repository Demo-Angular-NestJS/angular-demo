import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { AdminLayoutComponent } from '@c/layout';
import { PageBreadCrumbModel } from '@m/page-bread-crumb.model';

@Component({
  standalone: true,
  selector: 'app-my-purchase-page',
  templateUrl: './my-purchase-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
  ]
})
export class MyPurchasePageComponent implements OnDestroy {
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
  { title: 'My Purchases', url: null, svgIcon: 'purchase' },
];

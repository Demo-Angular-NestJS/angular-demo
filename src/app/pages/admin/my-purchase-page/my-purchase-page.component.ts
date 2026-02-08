import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseComponent } from '@c/shared/base.component';
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
export class MyPurchasePageComponent extends BaseComponent {
  constructor() {
    super();
    this.adminLayout?.breadCrumbs.set(breadCrumbs);
  }
}

const breadCrumbs: PageBreadCrumbModel[] = [
  { title: 'My Purchases', url: null, svgIcon: 'purchase' },
];

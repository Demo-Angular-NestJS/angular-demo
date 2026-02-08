import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseComponent } from '@c/shared/base.component';
import { PageBreadCrumbModel } from '@m/page-bread-crumb.model';

@Component({
  standalone: true,
  selector: 'app-toy-page',
  templateUrl: './toy-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
  ]
})
export class ToyPageComponent extends BaseComponent {
  constructor() {
    super();
    this.adminLayout?.breadCrumbs.set(breadCrumbs);
  }
}

const breadCrumbs: PageBreadCrumbModel[] = [
  { title: 'Toys', url: null, svgIcon: 'toy' },
];

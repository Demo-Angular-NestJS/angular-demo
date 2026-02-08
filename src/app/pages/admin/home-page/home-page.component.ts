import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BaseComponent } from '@c/shared/base.component';
import { CurrentUserService } from '@data/services';
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
export class HomePageComponent extends BaseComponent {
  protected currentUserService = inject(CurrentUserService);
  protected currentUser = toSignal(this.currentUserService.current$, { initialValue: null });

  constructor() {
    super();
    this.adminLayout?.breadCrumbs.set(breadCrumbs);
  }
}

const breadCrumbs: PageBreadCrumbModel[] = [
  { title: 'Home', url: null, svgIcon: 'home' },
  { title: 'Welcome', url: null }
];

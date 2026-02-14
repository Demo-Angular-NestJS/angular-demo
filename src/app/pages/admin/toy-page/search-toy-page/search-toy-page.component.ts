import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { ToyViewOnSearchComponent } from '@c/admin';
import { BaseComponent } from '@c/shared/base.component';
import { searchToyRoute } from '@constants';
import { HasPermissionDirectiveModule } from '@d/has-permission-directive';
import { CategoriesService } from '@data/services';
import { PageBreadCrumbModel } from '@m/page-bread-crumb.model';
import { ToyHelperService } from '@s/toy-helper.service';

@Component({
  standalone: true,
  selector: 'app-search-toy-page',
  templateUrl: './search-toy-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HasPermissionDirectiveModule,
    CommonModule,
    MatIconModule,
    ToyViewOnSearchComponent,
  ]
})
export class SearchToyPageComponent extends BaseComponent {
  isFilterOpen = false;

  protected readonly toyHelperService = inject(ToyHelperService);
  protected readonly categoriesService = inject(CategoriesService);

  protected toyItems = toSignal(this.toyHelperService.getAll(), { initialValue: [] });
  protected categories = toSignal(this.categoriesService.entities$, { initialValue: [] });

  constructor() {
    super();
    this.adminLayout?.breadCrumbs.set(defaultBreadCrumbs);
  }

  protected addNewItemEvent(): void {
    this.router.navigate([searchToyRoute, 'new']);
  }

  protected toggleFilters() {
    this.isFilterOpen = !this.isFilterOpen;
  }
}

const defaultBreadCrumbs: PageBreadCrumbModel[] = [
  { title: 'Toys', url: null, svgIcon: 'toy' },
  { title: 'Search', url: null, matIcon: 'search' },
];

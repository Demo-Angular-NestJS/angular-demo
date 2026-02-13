import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ToyViewOnSearchComponent } from '@c/admin';
import { BaseComponent } from '@c/shared/base.component';
import { CategoriesService } from '@data/services';
import { PageBreadCrumbModel } from '@m/page-bread-crumb.model';
import { ToyHelperService } from '@s/toy-helper.service';

@Component({
  standalone: true,
  selector: 'app-search-toy-page',
  templateUrl: './search-toy-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ToyViewOnSearchComponent,
  ]
})
export class SearchToyPageComponent extends BaseComponent {
  isFilterOpen = false;

  protected readonly toyHelperService = inject(ToyHelperService);
  protected readonly categoriesService = inject(CategoriesService);

  protected toyItems = toSignal(this.toyHelperService.getAll(), { initialValue: []});
  protected categories = toSignal(this.categoriesService.entities$, { initialValue: []});

  constructor() {
    super();
    this.adminLayout?.breadCrumbs.set(defaultBreadCrumbs);
  }

  toggleFilters() {
    this.isFilterOpen = !this.isFilterOpen;
  }
}

const defaultBreadCrumbs: PageBreadCrumbModel[] = [
  { title: 'Toys', url: null, svgIcon: 'toy' },
  { title: 'Search', url: null, matIcon: 'search' },
];

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal, ViewChild } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { SearchToyFilterFormComponent, SearchToyFilterFormModel, SearchToyListComponent } from '@c/admin';
import { BaseComponent } from '@c/shared/base.component';
import { searchToyRoute } from '@constants';
import { HasPermissionDirectiveModule } from '@d/has-permission-directive';
import { CategoriesService } from '@data/services';
import { PagingDataModel } from '@m/class';
import { PageBreadCrumbModel } from '@m/page-bread-crumb.model';
import { TranslocoModule } from '@ngneat/transloco';
import { ToySearchHelperService } from '@s/search/toy-search-helper.service';
import { provideTranslation } from '@u/helper';
import { TranslationLanguageEnum } from 'app/enum';
import { skip, take } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-search-toy-page',
  templateUrl: './search-toy-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideTranslation('searchToyPage', (lang: TranslationLanguageEnum) => import(`./i18n/${lang}.json`))],
  imports: [
    HasPermissionDirectiveModule,
    CommonModule,
    TranslocoModule,
    MatIconModule,
    SearchToyFilterFormComponent,
    SearchToyListComponent
  ]
})
export class SearchToyPageComponent extends BaseComponent {
  @ViewChild(SearchToyFilterFormComponent) searchToyFilterForm!: SearchToyFilterFormComponent;
  @ViewChild(SearchToyListComponent) searchToyList!: SearchToyListComponent;

  protected readonly toySearchHelperService = inject(ToySearchHelperService);
  protected readonly categoriesService = inject(CategoriesService);

  protected categories = toSignal(this.categoriesService.entities$, { initialValue: [] });
  protected catIdSelected = signal<string | null>(null);

  constructor() {
    super();
    this.adminLayout?.breadCrumbs.set(defaultBreadCrumbs);

    this.toySearchHelperService.loadDataFromUrl().pipe(takeUntilDestroyed()).subscribe();
    this.toySearchHelperService.getSearchResults().pipe(
      skip(1),
      takeUntilDestroyed()
    ).subscribe();

    effect(() => {
      const filterModel = this.toySearchHelperService.filterModel();
      this.catIdSelected.set(filterModel?.categoryId ?? null);

      if (this.searchToyFilterForm) {
        this.searchToyFilterForm.data = filterModel;
      }
    })
  }

  protected onFilterChange(value: SearchToyFilterFormModel): void {
    this.toySearchHelperService.updateFilterUrlParams(value)
      .pipe(take(1))
      .subscribe();
  }

  protected onPagingChange(value: PagingDataModel): void {
    this.toySearchHelperService.updatePagingUrlParams(value)
      .pipe(take(1))
      .subscribe();
  }

  protected addNewItemEvent(): void {
    this.router.navigate([searchToyRoute, 'new']);
  }

  protected onCategoryChange(categoryId: string) {
    this.catIdSelected.set(categoryId);
    this.toySearchHelperService.updateFilterUrlParams({ categoryId })
      .pipe(take(1))
      .subscribe();
  }
}

const defaultBreadCrumbs: PageBreadCrumbModel[] = [
  { title: 'global.pageTitles.Toys', url: null, svgIcon: 'toy' },
  { title: 'global.common.Search', url: null, matIcon: 'search' },
];

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SearchFavoriteItemListComponent } from '@c/admin';
import { BaseComponent } from '@c/shared/base.component';
import { PageBreadCrumbModel } from '@m/page-bread-crumb.model';

@Component({
  standalone: true,
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    SearchFavoriteItemListComponent,
  ]
})
export class FavoritePageComponent extends BaseComponent {
  protected readonly items = toSignal(this.currentFavouritesService.entities$, { initialValue: [] });

  constructor() {
    super();
    this.adminLayout?.breadCrumbs.set(breadCrumbs);
  }
}

const breadCrumbs: PageBreadCrumbModel[] = [
  { title: 'Favorite', url: null, svgIcon: 'favorite' },
  { title: 'Whishlist', url: null },
];

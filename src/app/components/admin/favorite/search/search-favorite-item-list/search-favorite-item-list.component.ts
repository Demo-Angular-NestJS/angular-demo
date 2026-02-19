import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { searchToyDetailRoute } from '@constants';
import { CurrentFavouritesService } from '@data/services';
import { FavoriteModel, ShortToyModel } from '@m/class';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  selector: 'app-search-favorite-item-list',
  templateUrl: './search-favorite-item-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
  ]
})
export class SearchFavoriteItemListComponent {
  protected readonly currentFavouritesService = inject(CurrentFavouritesService);
  protected readonly items = toSignal(this.currentFavouritesService.entities$, { initialValue: [] });
  protected readonly currentFavouritesMap = toSignal(this.currentFavouritesService.entityMapByToy$, { initialValue: {} as Record<string, FavoriteModel> });
  protected searchToyDetailRoute = searchToyDetailRoute;

  protected readonly _toastr = inject(ToastrService);
  private readonly _destroyRef = inject(DestroyRef);

  protected toggleFavoriteEvent(toy: ShortToyModel): void {
    const toyId = toy?.id ?? null;
    const favoriteData = new FavoriteModel({
      ...this.currentFavouritesMap()[toyId] || null,
      toyId,
    });
    const displayName = toy.name.length > 25
      ? toy.name.slice(0, 25) + '...'
      : toy.name;

    this.currentFavouritesService.toggle(favoriteData).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: () => {
        this._toastr.success(`The ${displayName} was removed to favourites!`);
      },
      error: () => {
        this._toastr.error(`An error occured while adding ${displayName} to favourites!`);
      }
    });
  }
}

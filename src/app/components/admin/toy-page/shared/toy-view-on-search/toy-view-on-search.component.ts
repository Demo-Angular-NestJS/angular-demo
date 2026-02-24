import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, input } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { searchToyDetailRoute } from '@constants';
import { LookupMapPipe } from '@data/pipe';
import { CategoriesService, CurrentFavouritesService } from '@data/services';
import { FavoriteModel, ToyModel } from '@m/class';
import { TranslocoModule } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  selector: 'app-toy-view-on-search',
  templateUrl: './toy-view-on-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    TranslocoModule,
    MatIconModule,
    LookupMapPipe,
  ]
})
export class ToyViewOnSearchComponent {
  toyData = input<ToyModel>(new ToyModel({}));

  protected readonly categoriesService = inject(CategoriesService);
  protected readonly currentFavouritesService = inject(CurrentFavouritesService);
  protected readonly categoryMap = toSignal(this.categoriesService.entityMap$, { initialValue: {} });
  protected readonly currentFavouritesMap = toSignal(this.currentFavouritesService.entityMapByToy$, { initialValue: {} as Record<string, FavoriteModel> });
  protected searchToyDetailRoute = searchToyDetailRoute;

  protected readonly _toastr = inject(ToastrService);
  private readonly _destroyRef = inject(DestroyRef);

  protected toggleFavoriteEvent(): void {
    const toyId = this.toyData()?.id ?? null;
    const favoriteData = new FavoriteModel({
      ...this.currentFavouritesMap()[toyId] || null,
      toyId,
    });
    const displayName = this.toyData().name.length > 25
      ? this.toyData().name.slice(0, 25) + '...'
      : this.toyData().name;

    this.currentFavouritesService.toggle(favoriteData).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: (resp) => {
        if (resp) {
          this._toastr.success(`The ${displayName} was added to favourites!`);
        } else {
          this._toastr.success(`The ${displayName} was removed to favourites!`);
        }
      },
      error: () => {
        this._toastr.error(`An error occured while adding ${displayName} to favourites!`);
      }
    });
  }
}

import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { searchToyDetailRoute } from '@constants';
import { CurrentFavouritesService } from '@data/services';
import { FavoriteModel, ShortToyModel } from '@m/class';
import { provideTranslation } from '@u/helper';
import { TranslationLanguageEnum } from 'app/enum';
import { ToastrService } from 'ngx-toastr';
import { FormDefaultsModule } from "@c/shared/form-defaults.module";
import { TranslocoService } from '@ngneat/transloco';

@Component({
  standalone: true,
  selector: 'app-search-favorite-item-list',
  templateUrl: './search-favorite-item-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideTranslation('searchFavoriteItemList', (lang: TranslationLanguageEnum) => import(`./i18n/${lang}.json`))],
  imports: [
    FormDefaultsModule,
  ],
})
export class SearchFavoriteItemListComponent {
  protected readonly currentFavouritesService = inject(CurrentFavouritesService);
  protected readonly items = toSignal(this.currentFavouritesService.entities$, { initialValue: [] });
  protected readonly currentFavouritesMap = toSignal(this.currentFavouritesService.entityMapByToy$, { initialValue: {} as Record<string, FavoriteModel> });
  protected searchToyDetailRoute = searchToyDetailRoute;

  private readonly _toastr = inject(ToastrService);
  private readonly _translocoService = inject(TranslocoService);
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
        const message = this._translocoService.translate('searchFavoriteItemList.Removed success message', { displayName });
        this._toastr.success(message);
      },
      error: () => {
        const message = this._translocoService.translate('searchFavoriteItemList.An error occured message', { displayName });
        this._toastr.error(message);
      }
    });
  }
}

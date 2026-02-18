import { inject, Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { BaseDataService } from './base-data.service';
import { FavoriteModel } from '@m/class';
import { map, tap } from 'rxjs';
import { arrayToRecord } from '@u/helper';
import { CurrentFavouritesTransferService } from '@data/transfer-services';

@Injectable({ providedIn: 'root' })
export class CurrentFavouritesService extends BaseDataService<FavoriteModel> {
  public entityMapByToy$ = this.entities$.pipe(map(entities => arrayToRecord('toyId', entities)));

  private readonly transferService = inject(CurrentFavouritesTransferService);

  constructor() {
    super(inject(EntityCollectionServiceElementsFactory), 'CurrentFavourites');
  }

  public override searchFieldMap(entity: FavoriteModel): string {
    return `${entity.userId} ${entity.toyId}`;
  }

  public toggle(entity: FavoriteModel) {
    return this.transferService.toggle(entity).pipe(
      tap((resp) => {
        if (!resp) {
          this.removeOneFromCache(entity);
        } else {
          if (entity?.id) {
            this.updateOneInCache(resp);
          } else {
            this.addOneToCache(resp);
          }
        }
      }),
    );
  }
}

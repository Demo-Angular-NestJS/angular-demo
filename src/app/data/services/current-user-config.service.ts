import { inject, Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { filter, map, Observable } from 'rxjs';
import { BaseDataService } from './base-data.service';
import { UserConfigurationModel } from '@m/class';

@Injectable({ providedIn: 'root' })
export class CurrentUserConfigurationService extends BaseDataService<UserConfigurationModel> {
    public readonly current$: Observable<UserConfigurationModel> = this.entities$.pipe(
        filter(entities => !!entities && entities.length > 0),
        map(entities => entities[0]) // Explicitly grab the first (and only) record
    );

    constructor() {
        super(inject(EntityCollectionServiceElementsFactory), 'CurrentUserConfiguration');
    }

    public override searchFieldMap(entity: UserConfigurationModel): string {
        return entity.userId;
    }
}

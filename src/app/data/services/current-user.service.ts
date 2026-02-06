import { inject, Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { filter, map, Observable } from 'rxjs';
import { BaseDataService } from './base-data.service';
import { UserModel } from '@m/class';

@Injectable({ providedIn: 'root' })
export class CurrentUserService extends BaseDataService<UserModel> {
    public readonly current$: Observable<UserModel> = this.entities$.pipe(
        filter(entities => !!entities && entities.length > 0),
        map(entities => entities[0]) // Explicitly grab the first (and only) record
    );

    constructor() {
        super(inject(EntityCollectionServiceElementsFactory), 'CurrentUser');
    }

    public override searchFieldMap(entity: UserModel): string {
        return `${entity.email} ${entity.userName}`;
    }
}

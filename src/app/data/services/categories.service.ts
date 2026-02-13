import { inject, Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { BaseDataService } from './base-data.service';
import { CategoryModel } from '@m/class';

@Injectable({ providedIn: 'root' })
export class CategoriesService extends BaseDataService<CategoryModel> {
  constructor() {
    super(inject(EntityCollectionServiceElementsFactory), 'Category');
  }

  public override searchFieldMap(entity: CategoryModel): string {
    return `${entity.name} ${entity.description || ''}`;
  }
}

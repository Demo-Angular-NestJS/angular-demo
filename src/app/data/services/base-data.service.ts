/* eslint-disable @typescript-eslint/no-explicit-any */
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { FilterField } from '@u/filters';
import { map, Observable } from 'rxjs';

export abstract class BaseDataService<TData extends { id?: string | number }> extends EntityCollectionServiceBase<TData> {
  public readonly entitiesEmptyFirst$: Observable<TData[]> = this.entities$.pipe(
    map((entities) => [this.getEmptyEntity(), ...entities])
  );

  constructor(
    elementsFactory: EntityCollectionServiceElementsFactory,
    entityName: string
  ) {
    super(entityName, elementsFactory);
  }

  public override setFilter(pattern: Partial<FilterField<TData>> | string): void {
    super.setFilter(pattern);
  }

  public idMap(entity: TData): string | number {
    return entity.id || (entity as any)._id;
  }

  public abstract searchFieldMap(entity: TData): string;

  protected getEmptyEntity(): TData {
    return {} as TData;
  }
}

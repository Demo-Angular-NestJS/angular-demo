/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseModel } from './base.model';
import { IFavorite } from '@m/interface/favorite.interface';
import { ShortToyModel } from './short-toy.model';

export class FavoriteModel extends BaseModel implements IFavorite {
  userId!: number | null;
  toyId!: number;
  personalNote!: string | null;
  toy!: ShortToyModel;

  constructor(data: Partial<any>) {
    super();
    this.initialize(data);
  }
}

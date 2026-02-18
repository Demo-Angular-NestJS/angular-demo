/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseModel } from './base.model';
import { IFavorite } from '@m/interface/favorite.interface';

export class FavoriteModel extends BaseModel implements IFavorite {
  userId!: number | null;
  toyId!: number;
  personalNote!: string | null;

  constructor(data: Partial<any>) {
    super();
    this.initialize(data);
  }
}

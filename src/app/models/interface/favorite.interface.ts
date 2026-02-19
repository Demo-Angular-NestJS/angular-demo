import { IBase } from './base.interface';
import { IShortToy } from './short-toy.interface';

export interface IFavorite extends Partial<IBase> {
  userId?: number | null;
  toyId: number;
  personalNote?: string | null;
  toy: IShortToy;
}

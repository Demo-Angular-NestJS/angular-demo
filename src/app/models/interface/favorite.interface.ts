import { IBase } from './base.interface';

export interface IFavorite extends Partial<IBase> {
  userId?: number | null;
  toyId: number;
  personalNote?: string | null;
}

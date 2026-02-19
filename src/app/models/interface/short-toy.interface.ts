import { IBase } from './base.interface';

export interface IShortToy extends Partial<IBase> {
  name: string;
  productSKU: string;
  shortDescription: string;
  price: number;
  categoryId: string;
  imageUrl: string;
  inStock: number;
}

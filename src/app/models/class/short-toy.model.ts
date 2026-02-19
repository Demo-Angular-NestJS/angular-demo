/* eslint-disable @typescript-eslint/no-explicit-any */
import { IShortToy } from '@m/interface';
import { BaseModel } from './base.model';

export class ShortToyModel extends BaseModel implements IShortToy {
  name!: string;
  productSKU!: string;
  shortDescription!: string;
  price!: number;
  categoryId!: string;
  imageUrl!: string;
  inStock!: number;

  constructor(data: Partial<any>) {
    super();
    this.initialize(data);
  }
}

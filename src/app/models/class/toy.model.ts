/* eslint-disable @typescript-eslint/no-explicit-any */
import { IToy } from '@m/interface';
import { BaseModel } from './base.model';

export class ToyModel extends BaseModel implements IToy {
  name!: string;
  productSKU!: string;
  shortDescription!: string;
  description!: string;
  tags!: string[];
  price!: number;
  categoryId!: string;
  imageUrl!: string;
  imageUrls!: string[];
  stars!: number;
  points!: number;
  inStock!: number;
  isActive!: boolean;

  constructor(data: Partial<any>) {
    super();
    this.initialize(data);
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICategory } from '@m/interface';
import { BaseModel } from './base.model';

export class CategoryModel extends BaseModel implements ICategory {
  name!: string;
  slug!: string;
  description!: string;
  minAge!: number;
  maxAge!: number;
  educationalFocus!: string[];
  isActive!: boolean;
  isDeleted!: boolean;

  constructor(data: Partial<any>) {
    super();
    this.initialize(data);
  }
}

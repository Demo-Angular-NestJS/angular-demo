import { IBase } from './base.interface';

export interface ICategory extends Partial<IBase> {
  name: string;
  slug?: string;
  description: string;
  minAge: number;
  maxAge: number;
  educationalFocus: string[];
  isActive?: boolean;
  isDeleted?: boolean;
}

import { IBase } from './base.interface';

export interface IToy extends Partial<IBase> {
  name: string | null;
  productSKU: string | null;
  shortDescription: string | null;
  description: string | null;
  tags?: string[] | null;
  price: number;
  categoryId: string | null;
  imageUrl: string | null;
  imageUrls?: string[];
  stars?: number;
  points?: number;
  inStock: number;
  isActive?: boolean;
}

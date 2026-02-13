/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditToyFormModel } from "./edit-toy-form.model";

export const mapToEditToyFormModel = (model: any): EditToyFormModel => ({
  name: model?.name ?? null,
  productSKU: model?.productSKU ?? null,
  shortDescription: model?.shortDescription ?? null,
  description: model?.description ?? null,
  tags: model?.tags ?? [],
  price: model?.price ?? null,
  categoryId: model?.categoryId ?? null,
  points: model?.points ?? null,
  inStock: model?.inStock ?? null,
  isActive: model?.isActive ?? false,
});

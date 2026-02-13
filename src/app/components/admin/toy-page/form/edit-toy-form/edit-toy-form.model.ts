import { Validators } from "@angular/forms";
import { ControlInfo } from "@u/generic";

export interface EditToyFormModel {
  name: string,
  productSKU: string,
  shortDescription: string;
  description: string;
  tags: string[];
  price: number;
  categoryId: string;
  points: number;
  inStock: number;
  isActive: boolean;
}

export const editToyForm: ControlInfo<EditToyFormModel> = {
  name: { vldtr: [Validators.required] },
  productSKU: { vldtr: [Validators.required] },
  shortDescription: { vldtr: [Validators.required, Validators.maxLength(100)] },
  description: {},
  tags: {},
  price: { vldtr: [Validators.required] },
  categoryId: { vldtr: [Validators.required] },
  // imageUrl: { vldtr: [Validators.required, Validators.pattern(imrgUrlPattern)] },
  // imageUrls: { vldtr: [Validators.pattern(imrgUrlPattern)] },
  points: { vldtr: [Validators.required] },
  inStock: { vldtr: [Validators.required] },
  isActive: {},
};

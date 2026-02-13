import { Validators } from "@angular/forms";
import { imrgUrlPattern } from "@constants";
import { ControlInfo } from "@u/generic";

export interface EditToyImagesFormModel {
  imageUrl: string;
  imageForGallery: string | null;
  imageUrls: string[];
}

export const editToyImagesForm: ControlInfo<EditToyImagesFormModel> = {
  imageUrl: { vldtr: [Validators.required, Validators.pattern(imrgUrlPattern)] },
  imageForGallery: { vldtr: [Validators.pattern(imrgUrlPattern)] },
  imageUrls: { vldtr: [Validators.pattern(imrgUrlPattern)] },
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditToyImagesFormModel } from "./edit-toy-images-form.model";

export const mapToEditToyImagesFormModel = (model: any): EditToyImagesFormModel => ({
  imageUrl: model?.imageUrl ?? null,
  imageForGallery: null,
  imageUrls: model?.imageUrls ?? [],
});

/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchToyFilterFormModel } from "./search-toy-filter-form.model";

export const mapToSearchToyFilterFormModel = (model: any): SearchToyFilterFormModel => ({
  name: model?.name ?? null,
  price: model?.price ?? null,
  minAge: model?.minAge !== null ? +(model?.minAge ?? 0) : null,
  maxAge: model?.maxAge !== null ? +(model?.maxAge ?? 0) : null,
});

import { ControlInfo } from "@u/generic";

export interface SearchToyFilterFormModel {
  name: string,
  price: number | null;
  minAge: number | null;
  maxAge: number | null;
}

export const editSearchToyFilterForm: ControlInfo<SearchToyFilterFormModel> = {
  name: {},
  price: {},
  minAge: {},
  maxAge: {},
};

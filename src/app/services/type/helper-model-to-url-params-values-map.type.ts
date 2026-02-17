export type HelperModelToUrlParamsValuesMapType<THelperFilterModel>
    = (params: THelperFilterModel[keyof THelperFilterModel]) => string[] | string;

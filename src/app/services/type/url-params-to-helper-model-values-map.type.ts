export type UrlParamsToHelperModelValuesMapType<THelperFilterModel, TParam = string[] | string>
    = (params: TParam) => THelperFilterModel[keyof THelperFilterModel];

import { HelperModelToUrlParamsValuesMapType } from './helper-model-to-url-params-values-map.type';
import { UrlParamsToHelperModelValuesMapType } from './url-params-to-helper-model-values-map.type';
import { UrlParamsToSearchCriterionValuesMapType } from './url-params-to-search-criterion-values-map.type';

export interface UrlDataToSearchCriterionDataMapItemType<TSearchHelperModel, TFilterConditionModel> {
    urlField: string;
    fieldType?: 'string' | 'number' | 'boolean' | 'date';
    searchCriterionField: string;
    filterCondition: TFilterConditionModel;
    modelFieldName: keyof TSearchHelperModel;
    mapToUrlParamFunc?: HelperModelToUrlParamsValuesMapType<TSearchHelperModel>;
    mapToSearchCriterionFunc?: UrlParamsToSearchCriterionValuesMapType;
    mapToHelperModelFunc?: UrlParamsToHelperModelValuesMapType<TSearchHelperModel>;
    notPartOfCriteria?: boolean;
}

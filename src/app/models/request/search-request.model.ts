import { PagingDataModel, SearchCriterionModel, SortingDataModel } from '@m/class';

export interface SearchRequestModel extends Partial<PagingDataModel>, Partial<SortingDataModel> {
    readonly searchCriteria: readonly SearchCriterionModel[];
}

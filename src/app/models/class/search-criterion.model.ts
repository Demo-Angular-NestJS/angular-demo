import { SearchOperatorTypeEnum } from "app/enum";

export interface SearchCriterionModel {
  readonly fieldName: string;
  readonly value: string;
  readonly condition: SearchOperatorTypeEnum;
  readonly dataType?: 'string' | 'number' | 'boolean' | 'date';
}

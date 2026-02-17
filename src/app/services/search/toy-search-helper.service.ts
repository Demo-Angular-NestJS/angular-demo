/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { combineLatest, filter, map, Observable, switchMap } from 'rxjs';
import { BaseSearchHelperService } from './base-search-helper.service';
import { ToyModel } from '@m/class';
import { SearchRequestModel } from '@m/request';
import { SearchResponseModel } from '@m/response';
import { ToyHelperService } from '@s/toy-helper.service';
import { UrlDataToSearchCriterionDataMapItemType } from '@s/type/url-data-to-search-criterion-data-map-item.type';
import { SearchOperatorTypeEnum } from 'app/enum';
import { CategoriesService } from '@data/services';
import { ToySearchParamsModel } from '@m/search';

@Injectable({ providedIn: 'root' })
export class ToySearchHelperService extends BaseSearchHelperService<ToyModel, ToySearchParamsModel> {
  private _toyHelperService = inject(ToyHelperService);
  private _categoriesService = inject(CategoriesService);

  constructor() {
    super('name', 'asc');
  }

  protected search(request: SearchRequestModel): Observable<SearchResponseModel<ToyModel>> {
    return this._toyHelperService.search(request);
  }

  protected getSearchParamsMap(): Observable<UrlDataToSearchCriterionDataMapItemType<ToySearchParamsModel, SearchOperatorTypeEnum>[]> {
    return combineLatest([
      this._categoriesService.loaded$.pipe(
        filter((v) => !!v),
        switchMap(() => this._categoriesService.entities$)
      )
    ]).pipe(
      map(([categories]) => {
        const dataMap: UrlDataToSearchCriterionDataMapItemType<ToySearchParamsModel, SearchOperatorTypeEnum>[] = [
          {
            urlField: 'categoryId',
            searchCriterionField: 'categoryId',
            filterCondition: SearchOperatorTypeEnum.EQUAL,
            modelFieldName: 'categoryId',
            mapToUrlParamFunc: (id: string | number | null) =>
              categories.find((c) => c.id === id)?.name ?? '',
            mapToSearchCriterionFunc: (params: string | string[]) => {
              const name = Array.isArray(params) ? params[0] : params;
              return categories.find((c) => c.name === name)?.id ?? '';
            },
            mapToHelperModelFunc: (params: string | string[]) => {
              const name = Array.isArray(params) ? params[0] : params;
              return categories.find((c) => c.name === name)?.id ?? '';
            }
          },
          {
            urlField: 'name',
            searchCriterionField: 'name',
            filterCondition: SearchOperatorTypeEnum.LIKE,
            modelFieldName: 'name',
          },
          {
            urlField: 'price',
            searchCriterionField: 'price',
            filterCondition: SearchOperatorTypeEnum.LESS_EQUAL,
            modelFieldName: 'price',
            fieldType: 'number',
          },
          {
            urlField: 'minAge',
            searchCriterionField: 'category.minAge',
            filterCondition: SearchOperatorTypeEnum.GREATER_EQUAL,
            modelFieldName: 'minAge',
            fieldType: 'number'
          },
          {
            urlField: 'maxAge',
            searchCriterionField: 'category.maxAge',
            filterCondition: SearchOperatorTypeEnum.LESS_EQUAL,
            modelFieldName: 'maxAge',
            fieldType: 'number'
          },
        ];

        return dataMap;
      })
    );
  }


  protected getItems(response: SearchResponseModel<ToyModel>): ToyModel[] {
    return response?.data ?? [];
  }
}

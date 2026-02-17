/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, signal } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, catchError, combineLatest, map, Observable, of, tap, filter, debounceTime, switchMap, finalize, from, distinctUntilChanged } from 'rxjs';
import { isArray, isEqual } from 'lodash';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchRequestModel } from '@m/request';
import { PagingDataModel, SearchCriterionModel } from '@m/class';
import { defaultPageSize, INPUT_DEBOUNCE_TIME_MS } from '@constants';
import { getIntOrDefault } from '@u/helper';
import { UrlDataToSearchCriterionDataMapItemType } from '@s/type/url-data-to-search-criterion-data-map-item.type';
import { SearchOperatorTypeEnum } from 'app/enum';
import { SearchResponseModel } from '@m/response';

export abstract class BaseSearchHelperService<TSearchObjectModel, THelperFilterModel = any> {
  // Services
  protected router = inject(Router);
  protected route = inject(ActivatedRoute);

  // Signals (State Management)
  public loading = signal<boolean>(false);
  public searchData = signal<readonly TSearchObjectModel[]>([]);
  public totalCount = signal<number>(0);
  public error = signal<HttpErrorResponse | null>(null);
  public filterModel = signal<THelperFilterModel | null>(null);

  // Subjects for internal stream control
  public searchRequestModel$ = new BehaviorSubject<SearchRequestModel | null>(null);
  public searchCriteriaModel$ = new BehaviorSubject<SearchCriterionModel[]>([]);

  protected readonly urlParameters: Record<string, string> = {
    'page': 'page',
    'itemsPerPage': 'itemsPerPage',
    'sortFieldName': 'sortFieldName',
    'sortOrder': 'sortOrder'
  };
  protected readonly sortTypes = { asc: 'asc', desc: 'desc' };

  private _currentParams: Record<string, any> = {};
  private _dataLoaded = false;

  protected constructor(
    protected defaultSortField: string,
    protected initialSortType: 'asc' | 'desc' = 'asc'
  ) { }

  /**
   * Orchestrates the search flow using signals and observables
   */
  public loadDataFromUrl(): Observable<SearchRequestModel> {
    return combineLatest([
      this.route.queryParams.pipe(debounceTime(INPUT_DEBOUNCE_TIME_MS)),
      this.getSearchParamsMap(),
    ]).pipe(
      tap(([params, dataMap]) => {
        this.filterModel.set(this.mapToHelperModel(params, dataMap));
      }),
      map(([params, dataMap]) => {
        this._currentParams = { ...params };

        const request: SearchRequestModel = {
          page: getIntOrDefault(params[this.urlParameters['page']], 1),
          itemsPerPage: getIntOrDefault(params[this.urlParameters['itemsPerPage']], defaultPageSize),
          sortBy: params[this.urlParameters['sortFieldName']] || this.defaultSortField,
          sortOrder: params[this.urlParameters['sortOrder']] || this.initialSortType,
          searchCriteria: [
            ...this.mapToCiteria(params, dataMap),
          ]
        };

        // Handle non-criteria model fields
        dataMap.filter(dm => dm?.notPartOfCriteria).forEach(dm => {
          const val = params[dm.urlField];
          const mappedVal = dm.mapToSearchCriterionFunc ? dm.mapToSearchCriterionFunc(val) :
            dm.mapToHelperModelFunc ? dm.mapToHelperModelFunc(val) : val;

          if (mappedVal !== undefined && mappedVal !== null) {
            (request as any)[dm.modelFieldName] = typeof mappedVal === 'string' ? mappedVal.trim() : mappedVal;
          }
        });

        this._dataLoaded = true;
        this.searchRequestModel$.next(request);
        return request;
      })
    );
  }

  public updateFilterUrlParams(model: Partial<THelperFilterModel>): Observable<boolean> {
    return this.getSearchParamsMap().pipe(
      switchMap((paramMap) => {
        const params: Record<string, any> = {};

        paramMap.forEach((mapItem) => {
          const modelKey = mapItem.modelFieldName as keyof THelperFilterModel;

          // Check if the property exists in the passed model
          if (modelKey && Object.prototype.hasOwnProperty.call(model, modelKey)) {
            const rawValue = model[modelKey];

            // Map the value
            const finalValue = mapItem.mapToUrlParamFunc
              ? mapItem.mapToUrlParamFunc(rawValue)
              : rawValue;

            // Convert empty strings to undefined so they are removed from the URL
            params[mapItem.urlField] = finalValue === '' ? undefined : finalValue;
          }
        });

        return from(this.updateUrlParameters(params));
      })
    );
  }

  public updatePagingUrlParams(model: PagingDataModel): Observable<boolean> {
        const params: Record<string, string> = {};
        params[this.urlParameters['page']] = `${model?.page ?? defaultPageSize}`;
        params[this.urlParameters['itemsPerPage']] = `${model?.itemsPerPage ?? 0}`;

        return from(this.updateUrlParameters(params));
    }

  public getSearchResults(): Observable<SearchResponseModel<TSearchObjectModel>> {
    return this.searchRequestModel$.pipe(
      filter((req): req is SearchRequestModel => !!req),
      distinctUntilChanged((prev, curr) => isEqual(prev, curr)),
      tap(() => this.loading.set(true)),
      switchMap((request): Observable<SearchResponseModel<TSearchObjectModel>> => {
        return this.search(request).pipe(
          catchError((errorResponse: HttpErrorResponse) => {
            this.error.set(errorResponse);

            return of({
              messages: null,
              totalCount: 0,
              returnedCount: 0,
              data: [],
            } as SearchResponseModel<TSearchObjectModel>);
          }),
          finalize(() => this.loading.set(false))
        );
      }),
      tap((response) => this.totalCount.set(response.totalCount ?? 0)),
      tap((response) => this.searchData.set(this.getItems(response)))
    );
  }

  protected async updateUrlParameters(params: Record<string, any>): Promise<boolean> {
    if (!this._dataLoaded) {
      return false;
    }

    this._currentParams = { ...this._currentParams, ...params };
    return this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this._currentParams,
      replaceUrl: true // Common requirement for search/paging
    });
  }

  private mapToCiteria(
    params: Params,
    dataMap: readonly UrlDataToSearchCriterionDataMapItemType<THelperFilterModel, SearchOperatorTypeEnum>[]
  ): readonly SearchCriterionModel[] {
    const searchCriterion = dataMap
      .filter((item) => params[item.urlField] && (isArray(params[item.urlField]) ? (params[item.urlField] as any).length > 0 : true) && !item.notPartOfCriteria)
      .map((item) => {
        const value = item.mapToSearchCriterionFunc ? item.mapToSearchCriterionFunc(params[item.urlField]) : params[item.urlField];
        const criterion: SearchCriterionModel = {
          fieldName: item.searchCriterionField,
          value: value && typeof (value) === 'string' ? value.trim() : value,
          condition: item.filterCondition,
          dataType: item?.fieldType ?? 'string',
        };

        return criterion;
      });

    return searchCriterion;
  }

  private mapToHelperModel(
    params: Params,
    dataMap: readonly UrlDataToSearchCriterionDataMapItemType<THelperFilterModel, SearchOperatorTypeEnum>[]
  ): THelperFilterModel {
    const helperModel: Partial<THelperFilterModel> = {};

    dataMap.forEach(item => {
      const value = params[item.urlField];
      const key = item.modelFieldName;

      if (key && value !== undefined && value !== null) {
        (helperModel as any)[key] = item.mapToHelperModelFunc
          ? item.mapToHelperModelFunc(value)
          : value;
      }
    });

    return helperModel as THelperFilterModel;
  }

  protected abstract search(request: SearchRequestModel): Observable<SearchResponseModel<TSearchObjectModel>>;
  protected abstract getSearchParamsMap(): Observable<any[]>;
  protected abstract getItems(response: SearchResponseModel<TSearchObjectModel>): TSearchObjectModel[];
}

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '@env/environment';
import { SearchRequestModel } from '@m/request';
import { SearchResponseModel } from '@m/response';
import { map, Observable } from 'rxjs';

export abstract class BaseHelperService<T> {
  public fullAPIUrl = '';
  protected http = inject(HttpClient);

  constructor(
    protected entityUrl: string,
    private modelConstructor: new (data: any) => T
  ) {
    const base = environment.apiUrl.replace(/\/$/, '');
    const entity = entityUrl.startsWith('/') ? entityUrl : `/${entityUrl}`;
    this.fullAPIUrl = `${base}${entity}`;
  }

  public search(request?: SearchRequestModel): Observable<SearchResponseModel<T>> {
    return this.http.post<any[]>(`${this.fullAPIUrl}/search`, request, { observe: 'response' }).pipe(
      map((response) => {
        const rawData = response.body || [];
        return {
          data: this.mapToModel(rawData),
          totalCount: Number(response.headers.get('X-Total-Count') ?? 0),
          messages: null,
        } as SearchResponseModel<T>;
      })
    );
  }

  public getAll(): Observable<T[]> {
    return this.http.get<any[]>(this.fullAPIUrl).pipe(
      map((resp) => this.mapToModel(resp) as T[])
    );
  }

  public getById(id: string): Observable<T> {
    return this.http.get<T>(`${this.fullAPIUrl}/${id}`).pipe(
      map((resp) => this.mapToModel(resp))
    );
  }

  public getFilteredParams(request: any): HttpParams {
    const filteredEntries = Object.entries(request).filter(
      ([_, value]) => value !== null && value !== undefined && value !== ''
    );

    return new HttpParams({
      fromObject: Object.fromEntries(filteredEntries) as Record<string, any>
    });
  }

  public create(payload: T): Observable<T> {
    return this.http.post<T>(this.fullAPIUrl, payload).pipe(
      map((resp) => this.mapToModel(resp) as T)
    );
  }

  public upsert(payload: T): Observable<T> {
    return this.http.post<T>(`${this.fullAPIUrl}/upsert`, payload).pipe(
      map((resp) => this.mapToModel(resp) as T)
    );
  }

  public update(id: string | number, payload: T): Observable<T> {
    return this.http.patch<T>(`${this.fullAPIUrl}/${id}`, payload).pipe(
      map((resp) => this.mapToModel(resp) as T)
    );
  }

  public delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.fullAPIUrl}/${id}`);
  }

  private mapToModel(data: any): T;
  private mapToModel(data: any[]): T[];
  private mapToModel(data: any | any[]): T | T[] {
    if (!data) {
      return data;
    }

    if (Array.isArray(data)) {
      return data.map((item) => new this.modelConstructor(item));
    }
    return new this.modelConstructor(data);
  }
}

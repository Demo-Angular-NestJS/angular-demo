/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '@env/environment';
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

  private mapToModel(data: any): T;
  private mapToModel(data: any[]): T[];
  private mapToModel(data: any | any[]): T | T[] {
    if (Array.isArray(data)) {
      return data.map((item) => new this.modelConstructor(item));
    }
    return new this.modelConstructor(data);
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BaseTransferService } from '@data/transfer-services';
import { environment } from '@env/environment';
import { FavoriteModel } from '@m/class';
import { HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CurrentFavouritesTransferService extends BaseTransferService<FavoriteModel> {
  constructor() {
    super('CurrentFavourites', inject(HttpClient), inject(HttpUrlGenerator), `${environment.apiUrl}/favorite`);
  }

  public override getAll(): Observable<FavoriteModel[]> {
    return this.http.get<FavoriteModel[]>(`${this.rootPath}/current`);
  }

  public override update(update: { id: string; changes: Partial<FavoriteModel> }): Observable<FavoriteModel> {
    return this.http.patch<FavoriteModel>(`${this.rootPath}/${update.id}`, update.changes);
  }

  public toggle(entity: FavoriteModel): Observable<FavoriteModel | null> {
    return this.http.post<FavoriteModel | null>(`${this.rootPath}/toggle`, entity);
  }
}

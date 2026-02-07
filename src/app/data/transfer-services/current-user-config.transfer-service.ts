import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BaseTransferService } from '@data/transfer-services';
import { environment } from '@env/environment';
import { UserModel } from '@m/class';
import { HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CurrentUserConfigurationTransferService extends BaseTransferService<UserModel> {
  constructor() {
    super('CurrentUserConfiguration', inject(HttpClient), inject(HttpUrlGenerator), `${environment.apiUrl}/userConfiguration`);
  }

  public override getAll(): Observable<UserModel[]> {
    return this.http.get<UserModel>(`${this.rootPath}/current`).pipe(
      map((user) => [user])
    );
  }

  public override update(update: { id: string; changes: Partial<UserModel> }): Observable<UserModel> {
    return this.http.patch<UserModel>(`${this.rootPath}/${update.id}`, update.changes);
  }
}

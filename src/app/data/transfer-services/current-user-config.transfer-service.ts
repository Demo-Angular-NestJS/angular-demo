import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BaseTransferService } from '@data/transfer-services';
import { environment } from '@env/environment';
import { UserConfigurationModel } from '@m/class';
import { HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CurrentUserConfigurationTransferService extends BaseTransferService<UserConfigurationModel> {
  constructor() {
    super('CurrentUserConfiguration', inject(HttpClient), inject(HttpUrlGenerator), `${environment.apiUrl}/userConfiguration`);
  }

  public override getAll(): Observable<UserConfigurationModel[]> {
    return this.http.get<UserConfigurationModel>(`${this.rootPath}/current`).pipe(
      map((user) => [user])
    );
  }

  public override update(update: { id: string; changes: Partial<UserConfigurationModel> }): Observable<UserConfigurationModel> {
    return this.http.patch<UserConfigurationModel>(`${this.rootPath}/${update.id}`, update.changes);
  }
}

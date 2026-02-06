/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { UserModel } from '@m/class';
import { UserExistRequestModel } from '@m/request';
import { UserExistResponseModel } from '@m/response';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserHelperService {
  private _http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/user`;

  public exists(request: UserExistRequestModel): Observable<UserExistResponseModel> {
    const filteredEntries = Object.entries(request).filter(
      ([_, value]) => value !== null && value !== undefined && value !== ''
    );
    const params = new HttpParams({
      fromObject: Object.fromEntries(filteredEntries)
    });

    return this._http.get<UserExistResponseModel>(`${this.API_URL}/exists`, { params });
  }

  public register(payload: UserModel): Observable<UserModel> {
    return this._http.post<UserModel>(`${this.API_URL}/register`, payload);
  }
}

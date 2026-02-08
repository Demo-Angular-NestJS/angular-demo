import { Injectable } from '@angular/core';
import { UserModel } from '@m/class';
import { UserExistRequestModel } from '@m/request';
import { UserExistResponseModel } from '@m/response';
import { Observable } from 'rxjs';
import { BaseHelperService } from './base-helper.service';
import { ChangePasswordRequestModel } from '@m/request/change-password.request';

@Injectable({ providedIn: 'root' })
export class UserHelperService extends BaseHelperService<UserModel>{
  constructor(){
    super('/user', UserModel);
  }

  public changePassowrd(payload: ChangePasswordRequestModel): Observable<void> {
    return this.http.post<void>(`${this.fullAPIUrl}/change-password`, payload);
  }

  public exists(request: UserExistRequestModel): Observable<UserExistResponseModel> {
    const params = this.getFilteredParams(request);

    return this.http.get<UserExistResponseModel>(`${this.fullAPIUrl}/exists`, { params });
  }

  public current(): Observable<UserExistResponseModel> {
    return this.http.get<UserExistResponseModel>(`${this.fullAPIUrl}/current`);
  }

  public register(payload: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.fullAPIUrl}/register`, payload);
  }
}

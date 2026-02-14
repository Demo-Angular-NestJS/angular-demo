import { Action } from '@ngrx/store';

export enum GlobalActionTypes {
  AppLogout = '[Global] Logout',
  AppLogIn = '[Global] LogIn',
}

export class LogInAction implements Action {
  readonly type = GlobalActionTypes.AppLogIn;
}

export class LogoutAction implements Action {
  readonly type = GlobalActionTypes.AppLogout;
}

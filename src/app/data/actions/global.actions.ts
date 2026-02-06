import { Action } from '@ngrx/store';

export enum GlobalActionTypes {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  AppLogout = '[Global] Logout',
}

export class LogoutAction implements Action {
  readonly type = GlobalActionTypes.AppLogout;
}

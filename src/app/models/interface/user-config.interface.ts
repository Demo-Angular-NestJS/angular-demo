import { IBase } from './base.interface';

export interface IUserConfiguration extends Partial<IBase> {
  userId: string;
  enableEmailNotifications: boolean;
  enableOrderStatus: boolean;
  systemTimeZone: string;
  isProfilePublic: boolean;
}

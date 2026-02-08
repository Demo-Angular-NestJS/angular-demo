import { IBase } from './base.interface';

export interface IUser extends Partial<IBase> {
  userName: string | null;
  email: string | null;
  phoneNumber: string | null;
  password?: string | null;
  isActive?: boolean | null;
  isAdmin?: boolean | null;
}

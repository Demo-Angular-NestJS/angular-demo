/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from '@m/interface';
import { BaseModel } from './base.model';

export class UserModel extends BaseModel implements IUser {
  userName!: string;
  email!: string;
  password!: string;
  isActive!: boolean;
  isAdmin!: boolean;

  constructor(data: Partial<any>) {
    super();

    if (data) {
      Object.keys(this).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          (this as any)[key] = data[key];
        }
      });

      Object.keys(this).forEach((key) => {
        if ((this as any)[key] === undefined) {
          delete (this as any)[key];
        }
      });
    }
  }
}

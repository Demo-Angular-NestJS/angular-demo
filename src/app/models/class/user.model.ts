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
    this.initialize(data);
  }
}

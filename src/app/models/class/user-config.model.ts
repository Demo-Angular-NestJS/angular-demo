/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUserConfiguration } from '@m/interface';
import { BaseModel } from './base.model';

export class UserConfigurationModel extends BaseModel implements IUserConfiguration {
  userId!: string;
  enableEmailNotifications!: boolean;
  enableOrderStatus!: boolean;
  systemTimeZone!: string;

  constructor(data: Partial<any>) {
    super();
    this.initialize(data);
  }
}

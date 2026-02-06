/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, inject } from '@angular/core';
import { EntityDataService } from '@ngrx/data';
import { BaseTransferService } from './base.transfer-service';
import { CurrentUserTransferService } from './current-user.transfer-service';

@Injectable({ providedIn: 'root' })
export class InitTransferService {
  private readonly entityDataService = inject(EntityDataService);
  private get transferServices(): Record<string, BaseTransferService<any>> {

    return {
      CurrentUser: inject(CurrentUserTransferService),
    };
  }

  constructor() {
    Object.entries(this.transferServices).forEach(([entityName, service]) => {
      this.entityDataService.registerService(entityName, service);
    });
  }

  public init(): void { }
}

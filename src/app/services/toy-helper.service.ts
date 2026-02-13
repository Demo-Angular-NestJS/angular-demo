import { Injectable } from '@angular/core';
import { ToyModel } from '@m/class';
import { BaseHelperService } from './base-helper.service';

@Injectable({ providedIn: 'root' })
export class ToyHelperService extends BaseHelperService<ToyModel>{
  constructor(){
    super('/toy', ToyModel);
  }
}

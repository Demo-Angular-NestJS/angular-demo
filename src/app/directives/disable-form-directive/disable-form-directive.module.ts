import { NgModule } from '@angular/core';
import { TDisableDirective } from './disable-form.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule, TDisableDirective],
  exports: [TDisableDirective],
})
export class DisableFormDirectiveModule { }

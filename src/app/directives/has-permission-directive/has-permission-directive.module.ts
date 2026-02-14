import { NgModule } from '@angular/core';
import { HasPermissionDirective } from './has-permission-directive.directive';

@NgModule({
  imports: [HasPermissionDirective],
  exports: [HasPermissionDirective],
})
export class HasPermissionDirectiveModule { }

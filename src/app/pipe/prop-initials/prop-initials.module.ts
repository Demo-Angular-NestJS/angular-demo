import { NgModule } from '@angular/core';
import { PropInitialsPipe } from './prop-initials.pipe';

@NgModule({
  imports: [
    PropInitialsPipe,
  ],
  exports: [
    PropInitialsPipe
  ]
})
export class PropInitialsModule { }

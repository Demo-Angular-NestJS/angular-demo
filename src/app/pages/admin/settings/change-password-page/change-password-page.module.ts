import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ChangePasswordPageComponent } from './change-password-page.component';

const routes: Route[] = [
  {
    path: '',
    component: ChangePasswordPageComponent,
    title: 'Change Passowrd Page',
    canActivate: [],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  providers: [],
})
export class ChangePassowrdPageModule { }

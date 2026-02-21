import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password.component';

const routes: Route[] = [
  {
    path: '',
    component: ForgotPasswordComponent,
    title: 'Forgot Password',
    canActivate: [],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  providers: [],
})
export class ForgotPasswordModule { }

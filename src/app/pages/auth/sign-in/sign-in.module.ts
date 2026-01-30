import { NgModule } from '@angular/core';
import { SignInComponent } from './sign-in.component';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: '',
    component: SignInComponent,
    title: 'Sign In',
    canActivate: [],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  providers: [],
})
export class SignInModule { }

import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';

const routes: Route[] = [
  {
    path: '',
    component: RegisterComponent,
    title: 'Register',
    canActivate: [],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  providers: [],
})
export class RegisterModule { }

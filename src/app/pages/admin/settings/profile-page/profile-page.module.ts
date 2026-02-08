import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ProfilePageComponent } from './profile-page.component';

const routes: Route[] = [
  {
    path: '',
    component: ProfilePageComponent,
    title: 'Profile Page',
    canActivate: [],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  providers: [],
})
export class ProfilePageModule { }

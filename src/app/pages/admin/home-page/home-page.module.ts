import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page.component';

const routes: Route[] = [
  {
    path: '',
    component: HomePageComponent,
    title: 'Home Page',
    canActivate: [],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  providers: [],
})
export class HomePageModule { }

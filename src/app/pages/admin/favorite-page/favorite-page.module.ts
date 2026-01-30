import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FavoritePageComponent } from './favorite-page.component';

const routes: Route[] = [
  {
    path: '',
    component: FavoritePageComponent,
    title: 'Favorite Page',
    canActivate: [],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  providers: [],
})
export class FavoritePageModule { }

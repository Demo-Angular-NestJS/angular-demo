import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { categoriesGuard, currentFavouritesGuard } from '@data/guards';
import { SearchToyPageComponent } from './search-toy-page.component';

const routes: Route[] = [
  {
    path: '',
    component: SearchToyPageComponent,
    title: 'Toy Search Page',
    canActivate: [
      categoriesGuard,
      currentFavouritesGuard,
    ],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  providers: [],
})
export class ToyPageModule { }

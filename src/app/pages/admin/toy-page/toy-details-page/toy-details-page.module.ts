import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { categoriesGuard } from '@data/guards';
import { ToyDetailsPageComponent } from './toy-details-page.component';

const routes: Route[] = [
  {
    path: '',
    component: ToyDetailsPageComponent,
    title: 'Toy Details Page',
    canActivate: [
      categoriesGuard,
    ],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  providers: [],
})
export class ToyDetailsPageModule { }

import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ToyPageComponent } from './toy-page.component';

const routes: Route[] = [
  {
    path: '',
    component: ToyPageComponent,
    title: 'Toy Page',
    canActivate: [],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  providers: [],
})
export class ToyPageModule { }

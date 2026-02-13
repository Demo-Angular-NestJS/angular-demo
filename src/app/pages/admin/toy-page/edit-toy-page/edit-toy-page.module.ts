import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { categoriesGuard } from '@data/guards';
import { EditToyPageComponent } from './edit-toy-page.component';

const routes: Route[] = [
  {
    path: '',
    component: EditToyPageComponent,
    title: 'Edit Toy Page',
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
export class EditToyPageModule { }

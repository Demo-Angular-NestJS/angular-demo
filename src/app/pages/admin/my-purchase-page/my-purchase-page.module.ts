import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MyPurchasePageComponent } from './my-purchase-page.component';

const routes: Route[] = [
  {
    path: '',
    component: MyPurchasePageComponent,
    title: 'My Purchase Page',
    canActivate: [],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  providers: [],
})
export class MyPurchasePageModule { }

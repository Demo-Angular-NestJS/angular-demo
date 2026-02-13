import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { detailRoute } from "@constants";

const routes: Routes = [
  {
    path: '',
    canActivate: [],
    children: [
      {
        path: '',
        canActivateChild: [],
        loadChildren: () => import('./search-toy-page/search-toy-page.module').then((m) => m.ToyPageModule),
      },
      {
        path: `${detailRoute}/:id`,
        canActivateChild: [],
        loadChildren: () => import('./toy-details-page/toy-details-page.module').then((m) => m.ToyDetailsPageModule),
      },
      {
        path: `:id`,
        canActivateChild: [],
        loadChildren: () => import('./edit-toy-page/edit-toy-page.module').then((m) => m.EditToyPageModule),
      },
    ],
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToyPageRoutingModule { }

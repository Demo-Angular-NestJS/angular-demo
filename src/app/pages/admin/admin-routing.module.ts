import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { favoriteRoute, homeRoute, myPurchaseRoute, settingRoute, toyRoute } from "@constants";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: homeRoute,
        canActivate: [],
        loadChildren: () => import('./home-page/home-page.module').then((m) => m.HomePageModule),
      },
      {
        path: toyRoute,
        canActivate: [],
        loadChildren: () => import('./toy-page/toy-page.module').then((m) => m.ToyPageModule),
      },
      {
        path: favoriteRoute,
        canActivate: [],
        loadChildren: () => import('./favorite-page/favorite-page.module').then((m) => m.FavoritePageModule),
      },
      {
        path: settingRoute,
        canActivate: [],
        loadChildren: () => import('./setting-page/setting-page.module').then((m) => m.SettingPageModule),
      },
      {
        path: myPurchaseRoute,
        canActivate: [],
        loadChildren: () => import('./my-purchase-page/my-purchase-page.module').then((m) => m.MyPurchasePageModule),
      },
      {
        path: '',
        redirectTo: homeRoute,
        pathMatch: 'full',
      },
    ],
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }

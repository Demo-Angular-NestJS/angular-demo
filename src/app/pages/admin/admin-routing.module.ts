import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { favoriteRoute, homeRoute, myPurchaseRoute, settingRoute, toyRoute } from "@constants";
import { currentUserConfigurationGuard, currentUserGuard } from "@data/guards";

const routes: Routes = [
  {
    path: '',
    canActivate: [
      currentUserGuard,
      currentUserConfigurationGuard,
    ],
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
        path: myPurchaseRoute,
        canActivate: [],
        loadChildren: () => import('./my-purchase-page/my-purchase-page.module').then((m) => m.MyPurchasePageModule),
      },
      {
        path: settingRoute,
        canActivate: [],
        loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule),
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

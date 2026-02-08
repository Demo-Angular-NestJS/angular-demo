import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { changePassowordRoute, profileRoute } from "@constants";

const routes: Routes = [
  {
    path: '',
    canActivate: [],
    children: [
      {
        path: '',
        canActivate: [],
        loadChildren: () => import('./setting-page/setting-page.module').then((m) => m.SettingPageModule),
      },
      {
        path: profileRoute,
        canActivate: [],
        loadChildren: () => import('./profile-page/profile-page.module').then((m) => m.ProfilePageModule),
      },
      {
        path: changePassowordRoute,
        canActivate: [],
        loadChildren: () => import('./change-password-page/change-password-page.module').then((m) => m.ChangePassowrdPageModule),
      },
    ],
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule { }

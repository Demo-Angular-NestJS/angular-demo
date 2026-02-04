import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { loginRoute, registerRoute } from "@constants";


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: loginRoute,
        canActivate: [],
        loadChildren: () => import('./sign-in/sign-in.module').then((m) => m.SignInModule),
      },
      {
        path: registerRoute,
        canActivate: [],
        loadChildren: () => import('./register/register.module').then((m) => m.RegisterModule),
      },
      {
        path: '',
        redirectTo: loginRoute,
        pathMatch: 'full',
      },
    ],
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }

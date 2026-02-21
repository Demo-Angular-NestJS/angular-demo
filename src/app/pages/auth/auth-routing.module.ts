import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { forgotPasswordRoute, loginRoute, registerRoute } from "@constants";


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
        path: forgotPasswordRoute,
        canActivate: [],
        loadChildren: () => import('./forgot-password/forgot-password.module').then((m) => m.ForgotPasswordModule),
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

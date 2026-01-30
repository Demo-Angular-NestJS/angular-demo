import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { signInRoute } from "@constants";


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: signInRoute,
        canActivate: [],
        loadChildren: () => import('./sign-in/sign-in.module').then((m) => m.SignInModule),
      },
      {
        path: '',
        redirectTo: signInRoute,
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

import { Routes } from '@angular/router';
import { MainLayoutComponent } from '@c/layout/main-layout/main-layout.component';
import { authRoute, defaultRoute, storeRoute } from '@constants';
import { adminGuard } from '@g/admin.guard';
import { guestGuard } from '@g/guest.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: defaultRoute,
    pathMatch: 'full',
  },

  // {
  //   path: 'error',
  //   component: MainLayoutComponent,
  //   data: {
  //     layout: 'emtpy'
  //   }
  // }

  {
    path: authRoute,
    component: MainLayoutComponent,
    data: {
      layout: 'authorization'
    },
    canActivate: [guestGuard],
    loadChildren: () => import('@pages/auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: storeRoute,
    component: MainLayoutComponent,
    data: {
      layout: 'admin'
    },
    canActivate: [adminGuard],
    loadChildren: () => import('@pages/admin/admin.module').then((m) => m.AdminModule),
  },

  { path: '**', redirectTo: defaultRoute },
  // { path: '**', redirectTo: '' },
];

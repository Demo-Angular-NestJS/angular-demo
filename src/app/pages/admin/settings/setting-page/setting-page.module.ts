import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SettingPageComponent } from './setting-page.component';

const routes: Route[] = [
  {
    path: '',
    component: SettingPageComponent,
    title: 'Settings Page',
    canActivate: [],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  providers: [],
})
export class SettingPageModule { }

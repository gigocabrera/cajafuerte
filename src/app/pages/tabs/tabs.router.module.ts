import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../../services/authguard.service';
import { Tabs } from './tabs';

const routes: Routes = [
  {path: 'tabs', component: Tabs, children: [
      {path: 'menu', children: [{path: '',loadChildren: '../menu/menu.module#MenuPageModule', canActivate: [AuthGuardService]}]},
      {path: 'alerts', children: [{path: '', loadChildren: '../alerts/alertspage/alerts.module#AlertsPageModule', canActivate: [AuthGuardService]}]},
      {path: 'favorites', children: [{path: '', loadChildren: '../favorites/favorites.module#FavoritesModule', canActivate: [AuthGuardService]}]},
      {path: 'settings', children: [{path: '', loadChildren: '../settings/settings.module#SettingsModule', canActivate: [AuthGuardService]}]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule {}

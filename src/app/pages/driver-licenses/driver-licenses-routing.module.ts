import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverLicensesPage } from './driver-licenses.page';

const routes: Routes = [
  {
    path: '',
    component: DriverLicensesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverLicensesPageRoutingModule {}

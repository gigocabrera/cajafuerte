import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverLicensesPageRoutingModule } from './driver-licenses-routing.module';

import { DriverLicensesPage } from './driver-licenses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverLicensesPageRoutingModule
  ],
  declarations: [DriverLicensesPage]
})
export class DriverLicensesPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DriverLicenseEditPageRoutingModule } from './driver-license-edit-routing.module';
import { DriverLicenseEditPage } from './driver-license-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverLicenseEditPageRoutingModule
  ],
  declarations: [DriverLicenseEditPage]
})
export class DriverLicenseEditPageModule {}
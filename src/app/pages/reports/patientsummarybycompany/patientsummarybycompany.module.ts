import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PatientsummarybycompanyPage } from './patientsummarybycompany.page';
import { EpochdatePipeModule } from '../../../pipes/epochdate.pipe.module';

const routes: Routes = [
  {
    path: '',
    component: PatientsummarybycompanyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    EpochdatePipeModule
  ],
  declarations: [PatientsummarybycompanyPage]
})
export class PatientsummarybycompanyPageModule {}

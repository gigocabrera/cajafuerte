import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClinicalreferralofficesPage } from './clinicalreferraloffices.page';

const routes: Routes = [
  {
    path: '',
    component: ClinicalreferralofficesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ClinicalreferralofficesPage]
})
export class ClinicalreferralofficesPageModule {}

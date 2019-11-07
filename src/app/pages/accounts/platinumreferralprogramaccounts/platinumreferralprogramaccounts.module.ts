import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PlatinumreferralprogramaccountsPage } from './platinumreferralprogramaccounts.page';

const routes: Routes = [
  {
    path: '',
    component: PlatinumreferralprogramaccountsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PlatinumreferralprogramaccountsPage]
})
export class PlatinumreferralprogramaccountsPageModule {}

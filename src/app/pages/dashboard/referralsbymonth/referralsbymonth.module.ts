import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReferralsbymonthPage } from './referralsbymonth.page';

const routes: Routes = [
  {
    path: '',
    component: ReferralsbymonthPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReferralsbymonthPage]
})
export class ReferralsbymonthPageModule {}

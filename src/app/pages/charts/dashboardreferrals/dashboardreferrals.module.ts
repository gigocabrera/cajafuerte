import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DashboardreferralsPage } from './dashboardreferrals.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardreferralsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardreferralsPage]
})
export class DashboardreferralsPageModule {}

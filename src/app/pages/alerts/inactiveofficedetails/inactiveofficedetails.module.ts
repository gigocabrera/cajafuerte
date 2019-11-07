import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InactiveofficedetailsPage } from './inactiveofficedetails.page';

const routes: Routes = [
  {
    path: '',
    component: InactiveofficedetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InactiveofficedetailsPage]
})
export class InactiveofficedetailsPageModule {}

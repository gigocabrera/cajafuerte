import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InactiveofficePage } from './inactiveoffice.page';

const routes: Routes = [
  {
    path: '',
    component: InactiveofficePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InactiveofficePage]
})
export class InactiveofficePageModule {}

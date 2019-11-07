import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PendingpatientsPage } from './pendingpatients.page';
import { EpochdatePipeModule } from '../../../pipes/epochdate.pipe.module';

const routes: Routes = [
  {
    path: '',
    component: PendingpatientsPage
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
  declarations: [PendingpatientsPage]
})
export class PendingpatientsPageModule {}

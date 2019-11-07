import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginAuto } from './loginauto';

const routes: Routes = [
  {
    path: '',
    component: LoginAuto
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginAutoRoutingModule { }

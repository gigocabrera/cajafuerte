import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TutorialPage } from './tutorial.page';
import { TranslateModule } from "@ngx-translate/core";

const routes: Routes = [
  {
    path: '',
    component: TutorialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule],
})
export class TutorialPageRoutingModule {}

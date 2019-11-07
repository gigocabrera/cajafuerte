import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from "@ngx-translate/core";
import { Settings } from './settings';
import { PickLanguage } from '../../pages/picklanguage/picklanguage';
import { PickAnimation } from '../../pages/pickanimation/pickanimation';

const routes: Routes = [
  {
    path: '',
    component: Settings
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Settings, PickLanguage, PickAnimation],
  entryComponents: [Settings, PickLanguage, PickAnimation]
})
export class SettingsModule {}

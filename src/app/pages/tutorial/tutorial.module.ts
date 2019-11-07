import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from "@ngx-translate/core";
import { TutorialPage } from './tutorial';
import { TutorialPageRoutingModule } from './tutorial-routing.module';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    IonicStorageModule.forRoot(),
    TutorialPageRoutingModule,
    TranslateModule
  ],
  declarations: [TutorialPage],
  entryComponents: [TutorialPage]
})
export class TutorialModule {}

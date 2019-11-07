import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from "@ngx-translate/core";
import { TabsRoutingModule } from './tabs.router.module';
import { Tabs } from './tabs';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    TabsRoutingModule
  ],
  declarations: [Tabs]
})
export class TabsModule {}

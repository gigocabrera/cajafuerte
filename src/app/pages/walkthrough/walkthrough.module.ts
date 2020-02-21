import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WalkthroughPageRoutingModule } from './walkthrough-routing.module';
import { WalkthroughPage } from './walkthrough.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalkthroughPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [WalkthroughPage]
})
export class WalkthroughPageModule {}

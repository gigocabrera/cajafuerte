import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RecentPageRoutingModule } from './recent-routing.module';
import { RecentPage } from './recent.page';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecentPageRoutingModule,
    TranslateModule
  ],
  declarations: [RecentPage]
})
export class RecentPageModule {}

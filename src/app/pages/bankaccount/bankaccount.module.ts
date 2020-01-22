import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from "@ngx-translate/core";
import { BankAccountPageRoutingModule } from './bankaccount-routing.module';
import { BankAccountPage } from './bankaccount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    BankAccountPageRoutingModule
  ],
  declarations: [BankAccountPage]
})
export class BankAccountPageModule {}

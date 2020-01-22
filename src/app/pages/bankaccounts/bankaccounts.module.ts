import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from "@ngx-translate/core";
import { BankAccountsPageRoutingModule } from './bankaccounts-routing.module';
import { BankAccountsPage } from './bankaccounts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    BankAccountsPageRoutingModule
  ],
  declarations: [BankAccountsPage]
})
export class BankAccountsPageModule {}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from "@ngx-translate/core";
import { CreditCardsPageRoutingModule } from './credit-cards-routing.module';
import { CreditCardsPage } from './credit-cards.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    CreditCardsPageRoutingModule
  ],
  declarations: [CreditCardsPage]
})
export class CreditCardsPageModule {}
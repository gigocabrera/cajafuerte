import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PasswordsPagePageRoutingModule } from './passwords-routing.module';
import { PasswordsPage } from './passwords.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordsPagePageRoutingModule
  ],
  declarations: [PasswordsPage]
})
export class PasswordsPagePageModule {}

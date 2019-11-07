import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from "@ngx-translate/core";
import { LogoutPage } from './logout';
import { LogoutPageRoutingModule } from './logout-routing.module';
import { IonicStorageModule } from '@ionic/storage';

const routes: Routes = [
  {
    path: '',
    component: LogoutPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicStorageModule.forRoot(),
    LogoutPageRoutingModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LogoutPage],
  entryComponents: [LogoutPage]
})
export class LogoutModule {}

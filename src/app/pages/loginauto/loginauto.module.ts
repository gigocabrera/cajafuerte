import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from "@ngx-translate/core";
import { LoginAuto } from './loginauto';
import { LoginAutoRoutingModule } from './loginauto-routing.module';
import { IonicStorageModule } from '@ionic/storage';

const routes: Routes = [
  {
    path: '',
    component: LoginAuto
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicStorageModule.forRoot(),
    LoginAutoRoutingModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginAuto],
  entryComponents: [LoginAuto]
})
export class LoginAutoModule {}

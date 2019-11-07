import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from "@ngx-translate/core";
import { LoginPage } from './login';
import { LoginPageRoutingModule } from './login-routing.module';
import { IonicStorageModule } from '@ionic/storage';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicStorageModule.forRoot(),
    LoginPageRoutingModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginPage],
  entryComponents: [LoginPage]
})
export class LoginModule {}

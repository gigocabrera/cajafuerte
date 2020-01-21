import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from "@ngx-translate/core";
import { IonicModule } from '@ionic/angular';
import { Personalprofile } from './personalprofile';
import { ChangeNamePage } from '../../pages/myinfo/changename/changename';
import { ChangeEmailPage } from '../../pages/myinfo/changeemail/changeemail';
import { ChangePasswordPage } from '../../pages/myinfo/changepassword/changepassword';
import { ChangePhotoPage } from '../../pages/myinfo/changephoto/changephoto';

const routes: Routes = [
  {
    path: '',
    component: Personalprofile
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Personalprofile, ChangeNamePage, ChangeEmailPage, ChangePasswordPage, ChangePhotoPage],
  entryComponents: [ChangeNamePage, ChangeEmailPage, ChangePasswordPage, ChangePhotoPage]
})
export class PersonalprofileModule {}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { LoadingService } from '../../services/loading.service';
import { ChangeNamePage } from '../../pages/myinfo/changename/changename';
import { ChangeEmailPage } from '../../pages/myinfo/changeemail/changeemail';
import { ChangePasswordPage } from '../../pages/myinfo/changepassword/changepassword';
import { ChangePhotoPage } from '../../pages/myinfo/changephoto/changephoto';

@Component({
  selector: 'app-personalprofile',
  templateUrl: 'personalprofile.html',
  styleUrls: ['personalprofile.scss'],
})
export class Personalprofile {

  public user = {};
  
  constructor(
    public modalController: ModalController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public loadingService: LoadingService,
    public authService: AuthService,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.user = this.authService.getUserData();
  }

  async changeName() {
    const modal = await this.modalController.create({
      component: ChangeNamePage
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data.result) {
      console.log(data.result);
      this.doChangeName(data);
    }
  }

  changePhoto() {
    /* let modal = this.modalCtrl.create(TakePhotoPage, { source: 'PersonalProfilePage', key: '' });
    modal.onDidDismiss((data: any[]) => {
      if (data) {
        //console.log(data);
      }
    });
    modal.present(); */
  }

  async changeEmail() {
    const modal = await this.modalController.create({
      component: ChangeEmailPage
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data.result) {
      this.doChangeEmail(data);
    }
  }
  
  async changePassword() {
    const modal = await this.modalController.create({
      component: ChangePasswordPage
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data.result) {
      this.doChangePassword(data);
    }
  }

  deleteAll() {
    /* let alert = this.alertCtrl.create({
      title: 'Please Confirm',
      message: 'Are you sure you want to delete your account and ALL your data?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            //console.log('Cancel RemoveUser clicked');
          }
        },
        {
          text: 'Delete',
          cssClass: 'alertDanger',
          handler: () => {
            if (this.authService.user.email === 'luis@example.com') {
              this.demoAccountAlert();
            } else {
              this.doRemoveUserAndDeleteAllData();
            }
          }
        }
      ]
    });
    alert.present(); */
  }

  doChangeName(newname): void {
    //this.authService.updateName(newname);
  }
  
  doChangeEmail(newemail): void {

    /* let loading = this.loadingController.create({
      content: 'Please wait...'
    });
    loading.present();

    var myAlert: {
      title?: string, 
      subtitle?: string
    } = {};

    this.authService.updateEmail(newemail)
      .then(() => {
        //
        // Update localStorage with new email. This is to guaratee
        // that TouchID, if enabled, is still fully functional
        //this.authService.storageSetEmail(newemail);
        //
        // Update email node under user profile 
        this.authService.updateEmailNode(newemail);
        //
        myAlert.title = 'DONE';
        myAlert.subtitle = 'User email changed successfully!';
        this.DisplayResult(myAlert, loading, false);
      }        
    )
    .catch(
      (error) => {          
        switch (error.code) {
          case 'auth/invalid-email':
            myAlert.title = 'Invalid Email';
            myAlert.subtitle = 'The new email used is invalid!';
            break;
          case 'auth/email-already-in-use':
            myAlert.title = 'Email already in use';
            myAlert.subtitle = 'That email is already in use by another user!';
            break;
          case 'auth/requires-recent-login':
            myAlert.title = 'Session timed out';
            myAlert.subtitle = 'This action requires a recent login!';
            break;
        }
        this.DisplayResult(myAlert, loading, false);
      }
    ); */
  }
  
  doChangePassword(newpassword): void {

    /* let loading = this.loadingController.create({
      content: 'Please wait...'
    });
    loading.present();

    var myAlert: {
      title?: string, 
      subtitle?: string
    } = {};

    this.authService.updatePassword(newpassword)
      .then(() => {
        myAlert.title = 'DONE';
        myAlert.subtitle = 'Password changed successfully!';
        this.DisplayResult(myAlert, loading, false);
      }        
    )
    .catch(
      (error) => {          
        switch (error.code) {
          case "auth/weak-password":
            myAlert.title = 'Weak Password';
            myAlert.subtitle = 'Your new password is not strong enough!';
            break;
          case "auth/requires-recent-login":
            myAlert.title = 'Session timed out';
            myAlert.subtitle = 'This action requires a recent login!';
            break;
        }
        this.DisplayResult(myAlert, loading, false);
      }
    );*/
  }

  doRemoveUserAndDeleteAllData(): void {

    /* let loading = this.loadingController.create({
      content: 'Please wait...'
    });
    loading.present();

    var myAlert: {
      title?: string, 
      subtitle?: string
    } = {};

    // Delete data
    this.authService.deleteData();
    
    // Delete user
    this.authService.deleteUser()
      .then(() => {
        loading.dismiss();
        this.logout();
      }
    )
    .catch(
      (error) => {
        switch (error.code) {
          case "auth/requires-recent-login":
            myAlert.title = 'Session timed out';
            myAlert.subtitle = 'This action requires a recent login!';
            break;
        }
        this.DisplayResult(myAlert, loading, false);
      }
    );*/
  }
  
  DisplayResult(myAlert, loading, logoff): void {

    /* loading.dismiss();

    let alert = this.alertCtrl.create({
      title: myAlert.title,
      subTitle: myAlert.subtitle,
      buttons: [{
        text: 'OK',
        handler: () => {
          let navTransition = alert.dismiss();
          navTransition.then(() => {
            if (logoff) {
              this.logout();
            }
          });
        }
      }]
    });
    alert.present(); */
  }

  logout() {
    this.authService.logout().then(() => {
    }).catch((Error) => {
      console.log(Error);
    })
  }

  demoAccountAlert() {
    /* let alert = this.alertCtrl.create({
      title: 'OOOPS...',
      subTitle: 'Not allowed on demo account!',
      buttons: ['OK']
    });
    alert.present();*/
  }

}

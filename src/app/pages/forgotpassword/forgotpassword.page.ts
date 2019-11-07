import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  email: any;
  values: any;
  errorMessage: string;
  errorTitle: string;

  constructor(
    public alertController: AlertController,
    public translate: TranslateService,
    public authService: AuthService) {

    this.translate.get([
      "LOGIN_ERROR",
      "LOGIN_ERROR_TITLE",
      "LOGIN_MISSING_EMAIL_TITLE",
      "LOGIN_MISSING_EMAIL_ERROR",
      "LOGIN_MISSING_PWD_TITLE",
      "LOGIN_MISSING_PWD_ERROR"
    ])
    .subscribe((values) => {
      this.values = values;
      this.errorMessage = values.LOGIN_ERROR;
      this.errorTitle = values.LOGIN_ERROR_TITLE;
    });
    
  }

  ngOnInit() {
  }

  forgotPassword() {

    // make sure input is valid
    if (!this.inputIsValid()){
      return;
    }

    this.authService.resetPassword(this.email)
    .then(() => {
      this.resetSuccess();
    }, error => {
      console.log(error);
      this.ValidationError(this.errorTitle, this.errorMessage);
    });
  }

  resetSuccess() {
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Password Reset',
      subHeader: 'Successful',
      message: 'An email has been sent with instructions on how to reset your password.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async ValidationError(title, errorMsg) {
    const alert = await this.alertController.create({
      header: title,
      subHeader: '',
      message: errorMsg,
      buttons: ['OK']
    });
    await alert.present();
  }

  inputIsValid(): boolean {
    if (this.email === undefined || this.email === '') {
      this.ValidationError(this.values.LOGIN_MISSING_EMAIL_TITLE, this.values.LOGIN_MISSING_EMAIL_ERROR);
      return false;
    }
    return true;
  }

}

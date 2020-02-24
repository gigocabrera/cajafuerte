import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';
import { UserCredential } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: any;
  password: any;
  values: any;
  errorMessage: string;
  errorTitle: string;

  constructor(
    public router: Router,
    public menuController: MenuController,
    public translate: TranslateService,
    public alertController: AlertController,
    public authService: AuthService,
    public loadingService: LoadingService
  ) {

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

  ionViewDidEnter() {
    this.menuController.enable(false);
  }
  
  login() {
    //
    // make sure input is valid
    if (!this.inputIsValid()){
      return;
    }
    //
    // load loading controller and wait before authenticating
    this.loadingService.showLoader();
    //
    // authenticate user
    this.authService.login(this.email, this.password)
    .then(() => {
      this.LoginSuccess();
    }, error => {
      console.log(error);
      setTimeout(() => {
        this.loadingService.hideLoader();
      }, 300);
      this.ValidationError(this.errorTitle, this.errorMessage);
    });
  }

  LoginSuccess() {
    setTimeout(() => {
      this.openMenuPage();
    }, 500);
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

  forgotPassword() {
    this.router.navigateByUrl('/forgotpassword');
  }

  openMenuPage() {
    this.router.navigateByUrl('/app/tabs/menu');
  }

  inputIsValid(): boolean {
    if (this.email === undefined || this.email === '') {
      this.ValidationError(this.values.LOGIN_MISSING_EMAIL_TITLE, this.values.LOGIN_MISSING_EMAIL_ERROR);
      return false;
    }
    if (this.password === undefined || this.password === '') {
      this.ValidationError(this.values.LOGIN_MISSING_PWD_TITLE, this.values.LOGIN_MISSING_PWD_ERROR);
      return false;
    }
    return true;
  }

}

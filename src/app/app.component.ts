import { Component } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from "@ngx-translate/core";
import { UserService } from '../app/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  isTouchID: boolean = false;

  constructor(
    private platform: Platform,
    public toastController: ToastController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public translate: TranslateService,
    public userService: UserService
  ) {

    this.isTouchID = this.userService.isTouchidEnabled;    
    this.initTranslate();
    this.initializeApp();

  }

  initTranslate() {
    var self = this;
    var userLang = "en";
    this.translate.setDefaultLang(userLang);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  subscribeToLangChanged() {
    return this.userService.onLangChanged.subscribe(x => this.userService.refreshConfig());
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      color: 'danger',
      duration: 2500,
      position: 'top'
    });
    toast.present();
  }

}

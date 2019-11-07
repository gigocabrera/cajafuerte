import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform, ModalController, MenuController } from '@ionic/angular';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { AppRate } from '@ionic-native/app-rate/ngx';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage/ngx';
import { PickLanguage } from '../../pages/picklanguage/picklanguage';
import { PickAnimation } from '../../pages/pickanimation/pickanimation';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  styleUrls: ['settings.scss']
})

export class Settings {
  
  version: string = '';
  keepmesignedinenabled: boolean = false;
  language: string;
  animation: string;
  values: any;
  ssObject: SecureStorageObject;

  public user = {};

  constructor(
    public router: Router,
    public platform: Platform,
    public alertController: AlertController,
    public modalController: ModalController,
    public menuController: MenuController,
    public appVersion: AppVersion,
    public emailComposer: EmailComposer,
    public appRate: AppRate,
    public secureStorage: SecureStorage,
    public translate: TranslateService,
    public authService: AuthService,
    public userService: UserService,
    public loadingService: LoadingService) {

      this.loadingService.showLoader();

      this.translate.get([
        "PLEASE_CONFIRM",
        "CANCEL_TITLE",
        "SETTINGS_RESET_MSG",
        "DONE_TITLE",
        "SETTINGS_RESET_DONE",
        "RESET"
      ])
      .subscribe((values) => {
        this.values = values;
      });

      this.user = authService.getUser();

      this.platform.ready().then(() => {
        this.appVersion.getVersionNumber().then(ver => {
          this.version = ver;
        }).catch(err => {
          //console.log(err);
        });
        if (this.platform.is('cordova')) {
          this.appRate.preferences.storeAppURL = {
            ios: '1466484332'
          };
        }
      });

      // get language
      this.userService.getLanguage().then((val)=>{
        this.language = val;
      });

      // get Keepmesignedin
      this.userService.getKeepmesignedin().then((val)=>{
        this.keepmesignedinenabled = val;  
      });

      // get animation
      this.userService.getAnimation().then((val)=>{
        this.animation = val;  
      });
  }

  ionViewDidEnter() {
    this.menuController.enable(true);
    this.loadingService.hideLoader();
  }

  openTouchID() {
    this.router.navigateByUrl('touchid');
  }

  toggleKeepSignedIn(item) {
    this.userService.useKeepmesignedin(item);
  }

  async languagePicker() {
    const modal = await this.modalController.create({
      component: PickLanguage
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    //
    // wait for user selection
    //
    if (data.result) {
      this.language = data.result;
      this.translate.use(this.language);
      this.userService.useLanguage(this.language);
    }
  }

  async animationPicker() {
    const modal = await this.modalController.create({
      component: PickAnimation
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    //
    // wait for user selection
    //
    if (data.result) {
      this.animation = data.result;
      this.userService.useAnimation(data.result);
    }
  }

  openAboutPage() {
    this.router.navigateByUrl('about');
  }

  reportBug() {
    let email = {
      to: 'appsupport@acentus365.com',
      subject: 'Report a Bug',
      body: 'I found a bug...',
      isHtml: true
    }
    this.emailComposer.open(email);
  }

  suggestFeature() {
    let email = {
      to: 'appsupport@acentus365.com',
      subject: 'Suggesting a Feature',
      body: 'I want to suggest a feature for AcentusReps app...',
      isHtml: true
    }
    this.emailComposer.open(email);
  }

  contactSupport() {
    let email = {
      to: 'appsupport@acentus365.com',
      subject: 'I need support',
      body: 'I have a problem with AcentusReps and I need support...',
      isHtml: true
    }
    this.emailComposer.open(email);
  }

  writeReview() {
    this.appRate.promptForRating(true);
  }
  
}

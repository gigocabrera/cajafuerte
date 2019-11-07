import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TouchID } from '@ionic-native/touch-id/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage/ngx';
import { Network } from '@ionic-native/network/ngx';
import { TranslateService } from "@ngx-translate/core";
import { UserService } from '../app/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  isTouchID: boolean = false;

  constructor(
    public platform: Platform,
    public toastController: ToastController,
    public router: Router,
    public storage: Storage,
    public secureStorage: SecureStorage,
    public network: Network,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public touchId: TouchID,
    public translate: TranslateService,
    public userService: UserService) {

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

      // subscribe to language changes
      this.subscribeToLangChanged();

      // watch network for a disconnection
      console.log('this.network.type', this.network.type);
      let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        this.presentToast('Network disconnected');
      });

      // watch network for a connection
      let connectSubscription = this.network.onConnect().subscribe(() => {
        // We just got a connection but we need to wait briefly
        // before we determine the connection type. Might need to wait.
        // prior to doing any api requests as well.
        setTimeout(() => {
          if (this.network.type === 'wifi') {
            this.presentToast('we got a wifi connection, woohoo!');
          } else {
            this.presentToast('we got a connection, woohoo!');
          }
        }, 3000);
      });

      if (this.platform.is('cordova')) {
        this.LoadSecureStorage();
      }

      // load language from storage
      this.userService.getLanguage().then((val)=>{
        if (val === undefined || val === '') {
          this.translate.use(val);
        }
      });

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // handle event for 'pause' - app goes to background
      this.platform.pause.subscribe(() => {
        console.log('handle event for pause');
        if (!this.userService.getKeepmesignedin()) {
          console.log('navigateByUrl tutorial');
          this.router.navigateByUrl('/tutorial');
        }
      });
      
      // handle event for 'resume' - app goes to foreground
      this.platform.resume.subscribe(() => {
        console.log('handle event for resume');
        if (!this.userService.getKeepmesignedin()) {
          console.log('navigateByUrl signInWithTouchID');
          if (this.isTouchID) {
            console.log('signInWithTouchID');
            this.signInWithTouchID();
          }
        }
      });    

    });
  }

  signInWithTouchID() {
    //
    // check if TouchID is supported
    this.touchId.isAvailable()
    .then(
      res => {
        this.touchId.verifyFingerprint('Scan your fingerprint please')
        .then(
          res => {
            this.router.navigateByUrl('/loginauto');
          },
          err => {console.error('Error', err)}
        );
      },
      err => {
        //console.error('TouchID is not available', err)
      }
    );
  }

  LoadSecureStorage() {
    //
    // secure storage
    //
    this.secureStorage.create('MAStorage')
    .then((storage: SecureStorageObject) => {

      // touch id
      storage.get('touchid')
        .then(data => {
          this.userService.isTouchidEnabled = data === 'true' ?  true : false;
          //console.log('touchid is:', data);

          // Display TouchID if enabled  
          if (data) {
            this.signInWithTouchID();
          } else {
            //console.log('touchid not enabled');
          }

        }
      );
      
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

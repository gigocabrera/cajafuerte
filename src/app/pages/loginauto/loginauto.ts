import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage/ngx';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'page-loginauto',
  templateUrl: 'loginauto.html',
  styleUrls: ['loginauto.scss']
})
export class LoginAuto {

  email: any;
  password: any;
  errordetails: string;
  ssObject: SecureStorageObject;

  constructor(
    public router: Router,
    public platform: Platform,
    public secureStorage: SecureStorage,
    public authService: AuthService,
    public loadingService: LoadingService) {

    this.loadingService.showLoader();
    
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.LoadSecureStorage();
      }
    });
    
  }
  
  autoLogin(email, password) {
    this.authService.login(email, password)
    .then(() => {
        this.LoginSuccess();
      }        
    )
    .catch(
      (error) => {
        this.LoginFailure();
      }
    );
  }

  LoginSuccess() {
    setTimeout(() => {
      this.router.navigateByUrl('/app/tabs/menu');
    }, 500);
  }

  LoginFailure() {
    this.router.navigateByUrl('/');
    this.loadingService.hideLoader();
  }

  LoadSecureStorage() {
    this.secureStorage.create('MAStorage')
    .then((storage: SecureStorageObject) => {

      this.ssObject = storage;

      // credentials
      storage.get('credentialsInfo')
        .then(data => {
          let {e,p} = JSON.parse(data);
          this.email = e;
          this.password = p;

          // auto login
          this.autoLogin(e,p);

        }
      );
      
    });
    
  }

}

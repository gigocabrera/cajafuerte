import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform, NavController } from '@ionic/angular';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage/ngx';

@Component({
  selector: 'app-touchid',
  templateUrl: 'touchid.html',
  styleUrls: ['touchid.scss'],
})
export class Touchid {

  email: string = '';
  pwd: string = '';
  touchidenabled: boolean = false;
  lockicon: string;
  showpwd: boolean = false;
  ssObject: SecureStorageObject;

  constructor(
    public router: Router,
    public platform: Platform,
    public alertController: AlertController,
    public secureStorage: SecureStorage) {

      this.platform.ready().then(() => {
        if (this.platform.is('cordova')) {
          this.LoadSecureStorage();
        }
      });

    }

    save() {

      if (this.touchidenabled) {
        
        // make sure credentials have been entered
        if (this.email === '') {
          this.showAlert();
          return;
        }
        if (this.pwd === '') {
          this.showAlert();
          return;
        }
  
        // Save info to storage
        if (this.platform.is('cordova')) {
  
          // Save touch id selection
          let b = this.touchidenabled === true ?  'true' : 'false';
          this.ssObject.set('touchid', b)
          .then(data => {
            //console.log(data);
          })
  
          // Save credentials
          this.ssObject.set('credentialsInfo', JSON.stringify({ e: this.email, p: this.pwd }))
          .then(data => {
            //console.log(data);
          })
        }
        this.goBack();
        
      } else {
  
        // TouchID not enabled - clear storage
        if (this.platform.is('cordova')) {
          
          // Remove touchid
          this.ssObject.remove('touchid')
          .then(
              data => console.log(data),
              error => console.log(error)
          );
  
          // Remove credentials
          this.ssObject.remove('credentialsInfo')
          .then(
              data => console.log(data),
              error => console.log(error)
          );
        }
        this.goBack();
  
      }
    }

    cancel() {
      this.goBack();
    }
  
    showPassword(): any {
      this.showpwd = !this.showpwd;
      this.lockicon = this.showpwd ?  'unlock-alt faRed' : 'lock';
    }
  
    async showAlert() {

      const alert = await this.alertController.create({
        header: 'Missing Email and/or Password',
        message: 'Please enter your credentials',
        buttons: ['OK']
      });
      alert.present();
    }
  
    goBack() {
      this.router.navigateByUrl('/app/tabs/settings');
    }
  
    LoadSecureStorage() {
      
      // Secure Storage
      this.secureStorage.create('MAStorage')
      .then((storage: SecureStorageObject) => {
  
        this.ssObject = storage;
  
        // Touch ID
        storage.get('touchid')
          .then(data => {
            this.touchidenabled = data === 'true' ?  true : false;
          }
        );
  
        // Credentials
        storage.get('credentialsInfo')
          .then(data => {
            let {e,p} = JSON.parse(data);
            this.email = e;
            this.pwd = p;
          }
        );
        
      });
      
    }

}

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-recent',
  templateUrl: 'recent.html',
  styleUrls: ['recent.scss'],
})
export class Recent {

  hcolor: string;
  items: any;
  values: any;
  noitemsfound: boolean = false;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    public toastController: ToastController,
    public authService: AuthService,
    public loadingService: LoadingService
  ) {}
  
  ngOnInit() {
    this.hcolor = 'orange';
    this.items = this.authService.getRecent();
  }

  openItem() {
    console.log('open item here');
  }

  deleteList() {
    this.presentAlertConfirm();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Please Confirm',
      subHeader: 'Are you sure you want to delete recent history?',
      message: 'By clicking delete below, you are only removing the items in your recent list, not actually deleting accounts',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.doDelete();
          }
        }
      ]
    });
    await alert.present();
  }

  doDelete() {
    console.log('do the delete here');
    //this.authService.deleteRecent();
  }
}
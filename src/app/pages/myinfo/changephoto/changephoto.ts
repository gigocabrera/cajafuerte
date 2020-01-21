import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';
import { ImageService } from '../../../services/image-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-changephoto',
  templateUrl: 'changephoto.html',
  styleUrls: ['changephoto.scss'],
})

export class ChangePhotoPage {

  private thisPic: any;
  private source: string;
  private key: string;
  private loadProgress: number = 0;
  private actionSheet: any;

  constructor(
    private imageService: ImageService,
    private authService: AuthService,
    private translateService: TranslateService
    ) {
      
      this.subscribeToLangChanged();
      //this.source = this.navParams.get('source');
      //this.key = this.navParams.get('key');

    }
  
  ionViewDidLoad() {
    this.photoSource();
    /* this.actionSheet.present(); */
  }

  dismiss() {
    //this.viewCtrl.dismiss();
  }

  photoSource() {

    /* // Load default forms
    this.translateService.get([
      "CHOOSE_IMAGE_SOURCE",
      "CAMERA_TITLE",
      "PHOTO_ALBUM_TITLE",
      "CANCEL_TITLE"
      ])
      .subscribe((values) => {
        
        this.actionSheet = this.actionSheetCtrl.create({
        title: values.CHOOSE_IMAGE_SOURCE,
        buttons: [
          {
            text: values.CAMERA_TITLE,
            handler: () => {
              this.thisPic = this.imageService.cameraImage()
              .then((data) => 
              {
                this.thisPic = data;
              })
            }
          },{
            text: values.PHOTO_ALBUM_TITLE,
            handler: () => {
              this.imageService.galleryImage()
              .then((data) => 
              {
                this.thisPic = data;
              })
            }
          },{
            text: values.CANCEL_TITLE,
            role: 'cancel',
            handler: () => {
              this.dismiss();
            }
          }
        ]
      });
      this.actionSheet.present();
    
    }); */

  }

  save() {
    /* this.authService.referrer = 'TakePhotoPage';
    if(this.source === 'PersonalProfilePage') {
      this.authService.saveProfileImage(this.thisPic, this.key);
    } else {
      this.authService.saveImage(this.thisPic, this.key);
    }
    this.showProgressBar(); */
  }

  showProgressBar() {
    setInterval(() => {
			if(this.loadProgress < 100){
				this.loadProgress++;
			} else {
        // go back
        this.dismiss();
      }
		}, 50);
  }

  subscribeToLangChanged() {
    // refresh text
    // please unsubribe during destroy
    //return this.translateProvider.onLangChanged.subscribe(x => this.photoSource());
  }
  
}
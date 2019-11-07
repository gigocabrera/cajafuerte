import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loader : any = null;
  isLoading = false;

  constructor(public loadingController: LoadingController) {}


  async createLoading() {
    this.loader = await this.loadingController.create({
      message: 'Please wait...'
    });
  }

  async showLoader() {
    this.createLoading().then(a => {
      this.loader.present();
    })
  }

  async hideLoader() {
    this.loader.dismiss();
  } 

}

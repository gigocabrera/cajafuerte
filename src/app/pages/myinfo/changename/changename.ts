import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-changename',
  templateUrl: 'changename.html',
  styleUrls: ['changename.scss'],
})

export class ChangeNamePage { 
  
  newname: string = '';
  account: any;

  constructor(
    public modalController: ModalController
  ) {}
  
  changeName(newname) {
    this.modalController.dismiss(newname);
  }
  
  dismiss(data) {
    this.modalController.dismiss({
      'result': data
    })
  }
    
}
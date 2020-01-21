import {Component} from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-changepassword',
  templateUrl: 'changepassword.html',
  styleUrls: ['changepassword.scss'],
})

export class ChangePasswordPage { 
  
  newpassword: string = '';
        
  constructor(
    public modalController: ModalController
  ) {}
 
  changePassword(newpassword) {
    this.modalController.dismiss(newpassword);
  }
  
  dismiss(data) {
    this.modalController.dismiss({
      'result': data
    })
  }
    
}
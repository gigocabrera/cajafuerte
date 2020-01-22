import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-changeemail',
  templateUrl: 'changeemail.html',
  styleUrls: ['changeemail.scss'],
})

export class ChangeEmailPage { 

  newemail: string = '';

  constructor(
    public modalController: ModalController
  ) {}
  
  changeEmail(newemail) {
    this.dismiss(newemail);
  }
  
  dismiss(data) {
    this.modalController.dismiss({
      'result': data
    })
  }
    
}
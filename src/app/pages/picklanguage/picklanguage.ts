import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-picklanguage',
  templateUrl: 'picklanguage.html',
  styleUrls: ['picklanguage.scss'],
})
export class PickLanguage {

  constructor(
    public modalController: ModalController) { }

  dismiss(data) {
    this.modalController.dismiss({
      'result': data
    })
  }

}

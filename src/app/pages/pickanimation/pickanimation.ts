import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pickanimation',
  templateUrl: 'pickanimation.html',
  styleUrls: ['pickanimation.scss'],
})
export class PickAnimation {

  constructor(
    public modalController: ModalController) { }

  dismiss(data) {
    this.modalController.dismiss({
      'result': data
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { ButtonFxService } from 'src/app/services/button-fx/button-fx.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent  implements OnInit {

  paramMessage: any;

  constructor(
    private navParams: NavParams,
    private buttonService: ButtonFxService,
    private modalController: ModalController
  ) {
    this.paramMessage = this.navParams.get("paramMessage");
   }

  ngOnInit() {}

  close() {
    this.buttonService.playButtonClickSound();
    this.modalController.dismiss();
  }

}

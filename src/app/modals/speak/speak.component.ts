import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ButtonFxService } from 'src/app/services/button-fx/button-fx.service';

@Component({
  selector: 'app-speak',
  templateUrl: './speak.component.html',
  styleUrls: ['./speak.component.scss'],
})
export class SpeakComponent  implements OnInit {

  constructor(
    private modalController: ModalController,
    private buttonService: ButtonFxService
  ) { }

  ngOnInit() {}

  dismiss() {
    this.buttonService.playButtonClickSound();
    this.modalController.dismiss();    
  }

}

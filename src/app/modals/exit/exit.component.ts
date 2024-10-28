import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { ButtonFxService } from 'src/app/services/button-fx/button-fx.service';

@Component({
  selector: 'app-exit',
  templateUrl: './exit.component.html',
  styleUrls: ['./exit.component.scss'],
})
export class ExitComponent  implements OnInit {

  constructor(
    private modalController: ModalController,
    private platform: Platform,
    private buttonService: ButtonFxService
  ) { }

  ngOnInit() {}

  exit() {
    this.buttonService.playButtonClickSound();

    if (this.shouldExitApp()) {
      (navigator as any).app.exitApp();
    } else {
      console.log('Back button pressed, but not exiting');
    }
  }

  shouldExitApp() {
    return true;
  }

  close() {
    this.buttonService.playButtonClickSound();
    this.modalController.dismiss();
  }

}

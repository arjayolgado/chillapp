import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ButtonFxService } from 'src/app/services/button-fx/button-fx.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent  implements OnInit {

  gameMechanics = "Learn while having fun! In this game, you can take pictures and see their labels. When you press the mic button, try to say the label out loud. If you get it right, you’ll see a positive message! If not, no worries—you can always try again. Keep practicing, and you’ll get better each time!";
  aboutApp = "Welcome to our fun learning app for kids! This app helps you learn words by taking pictures and saying what you see. It even greets you with a friendly message when you open it, based on the time of day. Enjoy learning and playing!";
  displayMessage: string = "";
  paramIndex: number = 0;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private buttonService: ButtonFxService
  ) {
    this.paramIndex = this.navParams.get('paramIndex');
   }

  ngOnInit() {
    if (this.paramIndex === 1) {
      this.displayMessage = this.aboutApp;
    } else {
      this.displayMessage = this.gameMechanics;
    }
  }

  close() {
    this.buttonService.playButtonClickSound();
    this.modalController.dismiss();
  }

}

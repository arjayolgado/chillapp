import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ButtonFxService } from 'src/app/services/button-fx/button-fx.service';
import { PopupComponent } from '../popup/popup.component';
import { GreetingsFxService } from 'src/app/services/greetings-fx/greetings-fx.service';
import { BgMusicService } from 'src/app/services/bg-music/bg-music.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  constructor(
    private modalController: ModalController,
    private buttonService: ButtonFxService,
    private greetingsFxService: GreetingsFxService,
    private bgMusicService: BgMusicService
  ) { }

  ngOnInit() {}

  close() {
    this.buttonService.playButtonClickSound();
    this.modalController.dismiss();
  }

  async openModal(index: number) {
    let mp3 = index === 1 ? "about.mp3" : "mechanics.mp3";

    this.bgMusicService.reduceVolume();
    if (index === 1) {
      setTimeout(async () => {
        this.bgMusicService.restoreVolume();
      }, 13000);
    } else {
      setTimeout(async () => {
        this.bgMusicService.restoreVolume();
      }, 18000);
    }

    this.buttonService.playButtonClickSound();
    const modal = await this.modalController.create({
      component: PopupComponent,
      cssClass: 'result-modal',
      componentProps: {
        paramIndex: index
      }
    });
    await modal.present();
    
    setTimeout(async () => {
      this.greetingsFxService.playButtonClickSound(mp3);  
    }, 200);

    modal.onDidDismiss().then(() => {
      this.bgMusicService.restoreVolume();
      this.greetingsFxService.stopButtonClickSound(mp3);
    });
  }

}

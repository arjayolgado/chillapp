import { Component } from '@angular/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { BgMusicService } from '../services/bg-music/bg-music.service';
import { MenuComponent } from '../modals/menu/menu.component';
import { ModalController } from '@ionic/angular';
import { PictureComponent } from '../modals/picture/picture.component';
import { ButtonFxService } from '../services/button-fx/button-fx.service';
import { GreetingsFxService } from '../services/greetings-fx/greetings-fx.service';
import { ResultComponent } from '../modals/result/result.component';
import { SpeakComponent } from '../modals/speak/speak.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  private isVolume: boolean;
  public volumeIcon: string;

  constructor(
    private bgMusicService: BgMusicService,
    private modalController: ModalController,
    private buttonService: ButtonFxService,
    private greetingsFxService: GreetingsFxService
  ) {
    this.isVolume = true;
    this.volumeIcon = '../../assets/images/speaker.png';
  }

  ngOnInit() {
    // this.getGreeting();
    
  }

  async waoko() {
    const modal = await this.modalController.create({
      component: SpeakComponent,
      cssClass: 'loader-modal'
    });
    await modal.present(); // Present the modal
  }

  async takePicture() {
    this.buttonService.playButtonClickSound();
    const modal = await this.modalController.create({
      component: PictureComponent,
      cssClass: 'picture-modal'
    });
    return await modal.present();
  }

  // async speakGreeting() {
  //   const greeting = this.getGreeting();
  //   // await this.speakText(greeting);
  // }

  async speakText(text: string) {
    try {
        await TextToSpeech.speak({
            text: text,
            rate: 1.0 // Adjust the speech rate as needed
        });
    } catch (error) {
        console.error('Error speaking text', error);
    }
  }

  async onMenuClick() {
    this.buttonService.playButtonClickSound();
    const modal = await this.modalController.create({
      component: MenuComponent,
      cssClass: 'menu-modal'
    });
    return await modal.present();

    this.waoko()
  }

  public onVolumeClick(): void {
    this.buttonService.playButtonClickSound();
    this.isVolume = !this.isVolume;

    if (this.isVolume) {
      this.volumeIcon = "../../assets/images/speaker.png";
      this.bgMusicService.unMute();
    } else {
      this.volumeIcon = "../../assets/images/muted-speaker.png";
      this.bgMusicService.mute();
    }
  }
}

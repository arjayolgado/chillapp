import { Component } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { WelcomeComponent } from './modals/welcome/welcome.component';
import { BgMusicService } from './services/bg-music/bg-music.service';
import { GreetingsFxService } from './services/greetings-fx/greetings-fx.service';
import { ExitComponent } from './modals/exit/exit.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private modalController: ModalController,
    private bgMusicService: BgMusicService,
    private greetingsFxService: GreetingsFxService,
    private platform: Platform
  ) {
    this.initializeApp();
    // this.bgMusicService.preloadAudio();
  }

  private initializeApp(): void {
    const isFirstTime = localStorage.getItem('firstTime');

    // if (isFirstTime !== 'true') {
    //   this.showWelcomeMessage();
    //   localStorage.setItem('firstTime', 'true');
    // }

    this.showWelcomeMessage();

    this.platform.ready().then(() => {
      // alert(123)
      this.handleBackButton();
    });
  }

  async showWelcomeMessage() {
    const modal = await this.modalController.create({
      component: WelcomeComponent,
      cssClass: 'welcome-modal'
    });
    await modal.present();

    modal.onDidDismiss().then(() => {
      this.getGreeting();
    });
  }

  private getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      this.greetingsFxService.playButtonClickSound("good-morning.mp3");  
    } else if (hour >= 12 && hour < 18) {
      this.greetingsFxService.playButtonClickSound("good-afternoon.mp3");
    } else {
      this.greetingsFxService.playButtonClickSound("good-evening.mp3");
    }
  }

  handleBackButton() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.displayExitModal()
    });
  }

  async displayExitModal() {
    const modal = await this.modalController.create({
      component: ExitComponent,
      cssClass: 'exit-modal',
    });
    await modal.present();
    
    setTimeout(async () => {
      this.bgMusicService.reduceVolume();
      this.greetingsFxService.playButtonClickSound("exit.mp3"); 
      setTimeout(async () => {
        this.bgMusicService.restoreVolume();
      }, 1200);
    }, 200);
  }
}

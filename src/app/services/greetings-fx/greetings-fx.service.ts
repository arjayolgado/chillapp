import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GreetingsFxService {

  private buttonSound: HTMLAudioElement;

  constructor() {
    this.buttonSound = new Audio();
    // this.buttonSound.src = 'assets/sounds/button.mp3';
   }

  playButtonClickSound(value: string) {
    this.buttonSound.src = `assets/sounds/${value}`;
    this.buttonSound.play();
  }

  stopButtonClickSound(value: string) {
    this.buttonSound.src = `assets/sounds/${value}`;

    this.buttonSound.pause();
  this.buttonSound.currentTime = 0;
  }
}

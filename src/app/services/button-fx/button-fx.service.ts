import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ButtonFxService {
  private buttonSound: HTMLAudioElement;

  constructor() {
    this.buttonSound = new Audio();
    this.buttonSound.src = 'assets/sounds/button.mp3';
   }

  playButtonClickSound() {
    this.buttonSound.play();
  }
}

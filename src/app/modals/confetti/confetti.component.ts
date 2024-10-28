import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confetti',
  templateUrl: './confetti.component.html',
  styleUrls: ['./confetti.component.scss'],
})
export class ConfettiComponent  implements OnInit {

  constructor(
    private modalController: ModalController
  ) {
    setTimeout(() => {
      this.closeModal();
    }, 2000); // 2 seconds delay
   }

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss(); // Close the modal
  }

}

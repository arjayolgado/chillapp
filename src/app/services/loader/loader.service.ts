import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loading: any;

  constructor(private loadingController: LoadingController) { }

  // Method to show loader
  async showLoader(message: string = 'Please wait...') {
    this.loading = await this.loadingController.create({
      message,
      spinner: 'circles' // Optional: you can customize the spinner type here
    });
    await this.loading.present();
  }

  // Method to hide loader
  async hideLoader() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ButtonFxService } from 'src/app/services/button-fx/button-fx.service';
import { Camera, CameraResultType, CameraSource  } from '@capacitor/camera';
import { VisionApiService } from 'src/app/services/vision-api/vision-api.service';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { LoadingComponent } from '../loading/loading.component';
import { CustomSearchService } from 'src/app/services/custom-search/custom-search.service';
import { ResultComponent } from '../result/result.component';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss'],
})
export class PictureComponent  implements OnInit {

  public base64Image: string;
  recording: boolean = false;
  result: any;
  private modal: any;
  searchResults: Array<any> = [];

    dump = [
    {
        "kind": "customsearch#result",
        "title": "Cat World | Best Friends Animal Society - Save Them All",
        "htmlTitle": "Cat World | Best Friends Animal Society - Save Them All",
        "link": "https://bestfriends.org/sites/default/files/styles/hero_mobile/public/hero-dash/Asana3808_Dashboard_Standard.jpg?h=ebad9ecf&itok=cWevo33k",
        "displayLink": "bestfriends.org",
        "snippet": "Cat World | Best Friends Animal Society - Save Them All",
        "htmlSnippet": "Cat World | Best Friends Animal Society - Save Them All",
        "mime": "image/jpeg",
        "fileFormat": "image/jpeg",
        "image": {
            "contextLink": "https://bestfriends.org/sanctuary/about-sanctuary/animal-areas/cat-world",
            "height": 710,
            "width": 660,
            "byteSize": 75428,
            "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT07EF0zWnzu8ZjeXcoUhgOwKyt2gbynifRFGJwBiFK2HJh2XisVtoNfEc&s",
            "thumbnailHeight": 140,
            "thumbnailWidth": 130
        }
    },
    {
        "kind": "customsearch#result",
        "title": "The Cats (& Humans) of Istanbul - YouTube",
        "htmlTitle": "The <b>Cats</b> (&amp; Humans) of Istanbul - YouTube",
        "link": "https://i.ytimg.com/vi/wd6JPuPqE84/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLApGvL4vG-4nhE83c0r8Wc-iKAWYg",
        "displayLink": "m.youtube.com",
        "snippet": "The Cats (& Humans) of Istanbul - YouTube",
        "htmlSnippet": "The <b>Cats</b> (&amp; Humans) of Istanbul - YouTube",
        "mime": "image/jpeg",
        "fileFormat": "image/jpeg",
        "image": {
            "contextLink": "https://m.youtube.com/watch?v=wd6JPuPqE84",
            "height": 386,
            "width": 686,
            "byteSize": 82285,
            "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFt1XoayDkdz3WqEfqt17PzPiWIw9cGIOdH2-8VXWVfWkG5xmgQNo4X3Y&s",
            "thumbnailHeight": 78,
            "thumbnailWidth": 139
        }
    },
    {
        "kind": "customsearch#result",
        "title": "The Natural History of Domestic Cats | Alley Cat Allies",
        "htmlTitle": "The Natural History of Domestic <b>Cats</b> | Alley Cat Allies",
        "link": "http://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg",
        "displayLink": "www.alleycat.org",
        "snippet": "The Natural History of Domestic Cats | Alley Cat Allies",
        "htmlSnippet": "The Natural History of Domestic <b>Cats</b> | Alley Cat Allies",
        "mime": "image/jpeg",
        "fileFormat": "image/jpeg",
        "image": {
            "contextLink": "https://www.alleycat.org/resources/the-natural-history-of-the-cat/",
            "height": 463,
            "width": 703,
            "byteSize": 107329,
            "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ZZ2PW_PFfQOXhrE3thlj_pkLTIpQDhTzxaUTzIZDAO5g91nwkC5-Sqs&s",
            "thumbnailHeight": 92,
            "thumbnailWidth": 140
        }
    }
]

  constructor(
    private modalController: ModalController,
    private buttonService: ButtonFxService,
    private visionApiService: VisionApiService,
    private customSearchService: CustomSearchService
  ) {
    this.base64Image = "";
    SpeechRecognition.requestPermission();
   }

  ngOnInit() {
    this.takePicture();
    // this.openResult(this.dump, "Test")
    
  }

  public onClickBack(): void {
    this.buttonService.playButtonClickSound();
    this.modalController.dismiss();
  }

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        source: CameraSource.Camera,
        resultType: CameraResultType.Base64,
      });
  
      this.base64Image = `data:image/jpeg;base64,${image.base64String}`;
      this.getVisionResult(this.base64Image);
  
    } catch (error) {
      this.modalController.dismiss();
    }
  }
  

  private getVisionResult(base64Image: string): void {
    this.openLoader();
    this.visionApiService.sendToVisionApi(base64Image).subscribe(
      (response: any) => {
        // alert(JSON.stringify(response));

        // alert(JSON.stringify(response.responses[0].localizedObjectAnnotations[0].name));
        this.getSearchResult(response.responses[0].localizedObjectAnnotations[0].name);
      },
      (error: any) => {
        this.closeLoader();

        console.error('Error with Vision API:', error);
        alert('Error with Vision API: ' + JSON.stringify(error));
      }
    );
  }

  getSearchResult(searchText: string) {
    this.customSearchService.customeSearchApi(searchText).subscribe(
      (response: any) => {
        // console.log(response);
        const newResponse = response.items.slice(0, 3);
        this.searchResults = newResponse;
        // alert('asd:'+ JSON.stringify(this.searchResults));
        this.openResult(this.searchResults, searchText)
      },
      (error: any) => {
        this.closeLoader();

        console.error('Error with Vision API:', error);
        alert('Error with Vision API: ' + JSON.stringify(error));
      }
    );
  }

  async openResult(searchResult: any, searchText: string) {
    this.closeLoader();
    const modal = await this.modalController.create({
      component: ResultComponent,
      cssClass: 'exit-modal',
      componentProps: {
        paramRes: searchResult,
        paramText: searchText
      }
    });
    await modal.present(); // Present the modal
    modal.onDidDismiss().then(() => {
      this.modalController.dismiss();
    });
  }

  async openLoader() {
    this.modal = await this.modalController.create({
      component: LoadingComponent,
      cssClass: 'loader-modal'
    });
    await this.modal.present(); // Present the modal
  }

  async closeLoader() {
    if (this.modal) {
      await this.modal.dismiss(); // Dismiss the modal
      this.modal = null; // Reset the modal instance
    }
  }

  async startRecognition() {
    const { available } = await SpeechRecognition.available();
    
    if (available) {
      this.recording = true;
      SpeechRecognition.start({
        popup: false,
        partialResults: true,
        language: 'en-US'
      });

      SpeechRecognition.addListener('partialResults', (data: any) => {
        alert(data.matches);
        this.result = data.matches;
      });
    }
  }

  async stopRecognition() {
    this.recording = false;
    await SpeechRecognition.stop();
  }

}

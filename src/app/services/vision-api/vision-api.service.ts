import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VisionApiService {

  constructor(
    private http: HttpClient
    ) { }

  sendToVisionApi(base64Image: string) {
    const customeSerachApiUrl = "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyB-lO74kRdrl-Ny2oe3vRo7y_JmFtHvMYA";
    
    const requestBody = {
      requests: [
        {
          image: {
            content: base64Image.replace('data:image/jpeg;base64,', '')
          },
          features: [
            {
              type: "OBJECT_LOCALIZATION",
              maxResults: 10
            }
          ]
        }
      ]
    };

    // Return the HTTP observable
    return this.http.post(customeSerachApiUrl, requestBody);
  }
}

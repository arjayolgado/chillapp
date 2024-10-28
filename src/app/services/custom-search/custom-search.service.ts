import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomSearchService {

  constructor(
    private http: HttpClient
  ) { }

  customeSearchApi(searchText: string) {
    const customeSerachApiUrl = `https://www.googleapis.com/customsearch/v1?q=${searchText}%203d%20images&cx=3445a144d26f841f7&key=AIzaSyA16UYUHW479vgMM3xmQwia-Pt276WpdVU&searchType=image&num=5&imgSize=large`;
    
    // Return the HTTP observable
    return this.http.get(customeSerachApiUrl);
  }
}

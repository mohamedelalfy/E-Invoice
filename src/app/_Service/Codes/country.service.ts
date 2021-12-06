import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Icountry } from 'src/app/_Interface/Codes/icountry';
import { GlobalApiurlService } from '../global-apiurl.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  SICountry: Icountry;
  SICountrylist: Icountry[];
  constructor(
    private http: HttpClient,
    private GlobalAPI: GlobalApiurlService
  ) { }
  
    // tslint:disable-next-line:quotemark
    localUrl = this.GlobalAPI.URLAPI + "CountryCodes/";
   GetAlldata()
   {
     return this.http.get<Icountry[]>(this.localUrl + 'Getall');
   }
   Getdata()
   {
     return this.http.get(this.localUrl + 'Getall');
   }
   putData()
   {
     return this.http.put(this.localUrl + 'Update', this.SICountry);
   }

   postData()
   {
     return this.http.post(this.localUrl + 'Save', this.SICountry);
   }
   Delete(index:any)
   {
     return this.http.delete(this.localUrl + 'Delete/' + index);
   }
   GetOne(index:any){
     return this.http.get(this.localUrl + 'Find/' + index);
   }
}

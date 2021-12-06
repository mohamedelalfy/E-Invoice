import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICurrencies } from 'src/app/_Interface/Codes/icurrencies';
import { GlobalApiurlService } from '../global-apiurl.service';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  SICurrencies: ICurrencies;
  SICurrencieslist: ICurrencies[];
  constructor(
    private http: HttpClient,
    private GlobalAPI: GlobalApiurlService
  ) { }
  
  localUrl = this.GlobalAPI.URLAPI + "Currencies/";
  GetAlldata()
  {
    return this.http.get<ICurrencies[]>(this.localUrl + 'Getall');
  }
  Getdata()
  {
    return this.http.get(this.localUrl + 'Getall');
  }
  putData()
  {
    return this.http.put(this.localUrl + 'Update', this.SICurrencies);
  }

  postData()
  {
    return this.http.post(this.localUrl + 'Save', this.SICurrencies);
  }
  Delete(index:any)
  {
    return this.http.delete(this.localUrl + 'Delete/' + index);
  }
  GetOne(index:any){
    return this.http.get(this.localUrl + 'Find/' + index);
  }
}

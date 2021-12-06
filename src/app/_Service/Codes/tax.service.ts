import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalApiurlService } from '../global-apiurl.service';
import { ITax } from 'src/app/_Interface/Codes/itax';

@Injectable({
  providedIn: 'root'
})
export class TaxService {
  SITax: ITax;
  SITaxList: ITax[];
  constructor(
    private http: HttpClient,
    private GlobalAPI: GlobalApiurlService) { }
  
  localUrl = this.GlobalAPI.URLAPI + 'Tax/';
  GetAlldata() {
    return this.http.get<ITax[]>(this.localUrl + 'Getall');
  }
  Getdata() {
    return this.http.get(this.localUrl + 'Getall');
  }

  FindByG(index:any) {
    return this.http.get<ITax[]>(this.localUrl + 'FindByG/' + index);
  }
  putData() {
    return this.http.put(this.localUrl + 'Update', this.SITax);
  }

  postData() {
    return this.http.post(this.localUrl + 'Save', this.SITax);
  }
  Delete(index:any) {
    return this.http.delete(this.localUrl + 'Delete/' + index);
  }
  GetOne(index:any) {
    return this.http.get(this.localUrl + 'Find/' + index);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItaxSubTypes } from 'src/app/_Interface/Codes/itax-sub-types';
import { GlobalApiurlService } from '../global-apiurl.service';

@Injectable({
  providedIn: 'root'
})
export class TaxSubTypesService {
  ITaxSubTypes: ItaxSubTypes;
  ITaxSubTypesList: ItaxSubTypes[];
  constructor(
    private http: HttpClient,
    private GlobalAPI: GlobalApiurlService) { }
  
  localUrl = this.GlobalAPI.URLAPI + 'TaxSubtypes/';
  GetAlldata() {
    return this.http.get<ItaxSubTypes[]>(this.localUrl + 'Getall');
  }
  Getdata() {
    return this.http.get(this.localUrl + 'Getall');
  }

  FindByG(index:any) {
    return this.http.get<ItaxSubTypes[]>(this.localUrl + 'FindByG/' + index);
  }
  putData() {
    return this.http.put(this.localUrl + 'Update', this.ITaxSubTypes);
  }

  postData() {
    return this.http.post(this.localUrl + 'Save', this.ITaxSubTypes);
  }
  Delete(index:any) {
    return this.http.delete(this.localUrl + 'Delete/' + index);
  }
  GetOne(index:any) {
    return this.http.get(this.localUrl + 'Find/' + index);
  }
}

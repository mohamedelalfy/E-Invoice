import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iuints } from 'src/app/_Interface/Codes/iuints';
import { GlobalApiurlService } from '../global-apiurl.service';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  SIuints: Iuints;
  SIuintsList: Iuints[];
  constructor(
    private http: HttpClient,
    private GlobalAPI: GlobalApiurlService
    ) { }
  
  localUrl = this.GlobalAPI.URLAPI + 'Units/';
  GetAlldata() {
    return this.http.get<Iuints[]>(this.localUrl + 'Getall');
  }
  Getdata() {
    return this.http.get(this.localUrl + 'Getall');
  }

  FindByG(index:any) {
    return this.http.get<Iuints[]>(this.localUrl + 'FindByG/' + index);
  }
  putData() {
    return this.http.put(this.localUrl + 'Update', this.SIuints);
  }

  postData() {
    return this.http.post(this.localUrl + 'Save', this.SIuints);
  }
  Delete(index:any) {
    return this.http.delete(this.localUrl + 'Delete/' + index);
  }
  GetOne(index:any) {
    return this.http.get(this.localUrl + 'Find/' + index);
  }
}

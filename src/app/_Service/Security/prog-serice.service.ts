import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProgram } from 'src/app/_Interface/Security/iprogram';
import { GlobalApiurlService } from '../global-apiurl.service';

@Injectable({
  providedIn: 'root'
})
export class ProgSericeService {


  Progarm: IProgram;
  localUrl = this.GlobalAPI.URLAPI + 'Program';
   // localUrl = 'http://151.106.34.109:7040/api/Program/Get';
   constructor(
     private http: HttpClient,
     private GlobalAPI: GlobalApiurlService) {
    }
  
   
  getmenu(username:any)
  {
    return this.http.get<IProgram[]>(this.localUrl + '/Get' + '/' + username);
  }

  getProg()
  {
    return this.http.get<IProgram[]>(this.localUrl + '/Get');
  }
}

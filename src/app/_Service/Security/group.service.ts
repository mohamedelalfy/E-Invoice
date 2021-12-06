import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Igroup } from 'src/app/_Interface/Security/igroup';
import { GlobalApiurlService } from '../global-apiurl.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  Sergroup: Igroup;
  SergroupList: Igroup[];
  constructor(private http: HttpClient,private GlobalAPI: GlobalApiurlService) {


   }
   
   localUrl = this.GlobalAPI.URLAPI + 'Groups/';
   GetAlldata()
   {
     return this.http.get<Igroup[]>(this.localUrl + 'get');
   }
   Getdata()
   {
     return this.http.get(this.localUrl + 'get');
   }
   putData()
   {
     return this.http.put(this.localUrl + 'put', this.Sergroup);
   }

   postData()
   {
     return this.http.post(this.localUrl + 'post', this.Sergroup);
   }
   Delete(index:any)
   {
     return this.http.delete(this.localUrl + 'Delete/' + index);
   }
   GetOne(index:any){
     return this.http.get(this.localUrl + 'get/' + index);
   }



}

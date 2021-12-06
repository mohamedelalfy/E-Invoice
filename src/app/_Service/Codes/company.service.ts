import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Icompany } from 'src/app/_Interface/Codes/icompany';
import { GlobalApiurlService } from '../global-apiurl.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  SIcompany: Icompany;
   SIcompanylist: Icompany[];
   documents: any[];
   
  constructor(
    private http: HttpClient,
    private GlobalAPI: GlobalApiurlService
  ) { }
  
    // tslint:disable-next-line:quotemark
    localUrl = this.GlobalAPI.URLAPI + "Company/";
    // tslint:disable-next-line:quotemark
    localUrl2 = this.GlobalAPI.URLAPI + "documents/";
   GetAlldata()
   {
     return this.http.get<Icompany[]>(this.localUrl + 'Getall',this.GlobalAPI.httpOptions);
   }
   Getdata()
   {
     return this.http.get(this.localUrl + 'Getall',this.GlobalAPI.httpOptions);
   }

   Getdatadocuments()
   {
     return this.http.get(this.localUrl2 + 'Getall',this.GlobalAPI.httpOptions);
   }
   putData()
   {
     console.log(this.localUrl + 'Update', this.SIcompany,this.GlobalAPI.httpOptions);
     return this.http.put(this.localUrl + 'Update', this.SIcompany,this.GlobalAPI.httpOptions);
   }

   postData()
   {
     return this.http.post(this.localUrl + 'Save', this.SIcompany,this.GlobalAPI.httpOptions);
   }

   postData2()
   {
     return this.http.post(this.localUrl + 'Save', this.documents,this.GlobalAPI.httpOptions);
   }
   Delete(index:any)
   {
     return this.http.delete(this.localUrl + 'Delete/' + index,this.GlobalAPI.httpOptions);
   }
   GetOne(index:any){
     return this.http.get(this.localUrl + 'Find/' + index,this.GlobalAPI.httpOptions);
   }
}

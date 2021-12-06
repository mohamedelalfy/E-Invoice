import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Igovernorate } from 'src/app/_Interface/Codes/igovernorate';
import { GlobalApiurlService } from '../global-apiurl.service';

@Injectable({
  providedIn: 'root'
})
export class GovernorateService {
  SIgovernorate: Igovernorate;
  SIgovernorateList: Igovernorate[];
  constructor( 
    private http: HttpClient,
    private GlobalAPI: GlobalApiurlService
    ) { }
  
  localUrl = this.GlobalAPI.URLAPI + "Governorates/";
  GetAlldata()
  {
    return this.http.get<Igovernorate[]>(this.localUrl + 'Getall');
  }
  FindbyG(index:any)
  {
    return this.http.get<Igovernorate[]>(this.localUrl + 'FindbyG/'+index);
  }
  Getdata()
  {
    return this.http.get(this.localUrl + 'Getall');
  }
  putData()
  {
    return this.http.put(this.localUrl + 'Update', this.SIgovernorate);
  }

  postData()
  {
    return this.http.post(this.localUrl + 'Save', this.SIgovernorate);
  }
  Delete(index:any)
  {
    return this.http.delete(this.localUrl + 'Delete/' + index);
  }
  GetOne(index:any){
    return this.http.get(this.localUrl + 'Find/' + index);
  }
}

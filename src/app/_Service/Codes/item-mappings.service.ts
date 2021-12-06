import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IitemMapping } from 'src/app/_Interface/Codes/iitem-mapping';
import { GlobalApiurlService } from '../global-apiurl.service';

@Injectable({
  providedIn: 'root'
})
export class ItemMappingsService {


  SIitemMapping: IitemMapping;
  SIitemMappinglist: IitemMapping[];
  constructor(
    private http: HttpClient,
    private GlobalAPI: GlobalApiurlService) { }

   // tslint:disable-next-line:quotemark
   localUrl = this.GlobalAPI.URLAPI + "ItemMappings/";
  GetAlldata()
  {
    return this.http.get<IitemMapping[]>(this.localUrl + 'Getall');
  }
  Getdata()
  {
    return this.http.get(this.localUrl + 'Getall');
  }
  putData()
  {
    return this.http.put(this.localUrl + 'Update', this.SIitemMapping);
  }

  postData()
  {
    return this.http.post(this.localUrl + 'Save', this.SIitemMapping);
  }
  Delete(index:any)
  {
    return this.http.delete(this.localUrl + 'Delete/' + index);
  }
  GetOne(index:any){
    return this.http.get(this.localUrl + 'Find/' + index);
  }
}

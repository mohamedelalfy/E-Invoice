import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICurrencyMapping } from 'src/app/_Interface/Codes/icurrency-mapping';
import { IUnitMapping } from 'src/app/_Interface/Codes/iunit-mapping';
import { GlobalApiurlService } from '../global-apiurl.service';

@Injectable({
  providedIn: 'root'
})
export class UnitMappingService {


  SUnitMapping: IUnitMapping;
  SUnitMappingList: IUnitMapping[];
  constructor(
    private http: HttpClient,
    private GlobalAPI: GlobalApiurlService) { }

    // tslint:disable-next-line:quotemark
    localUrl = this.GlobalAPI.URLAPI + "UnitsMapping/";
   GetAlldata()
   {
     return this.http.get<IUnitMapping[]>(this.localUrl + 'Getall');
   }
   Getdata()
   {
     return this.http.get(this.localUrl + 'Getall');
   }
   putData()
   {
     return this.http.put(this.localUrl + 'Update', this.SUnitMapping);
   }

   postData()
   {
     return this.http.post(this.localUrl + 'Save', this.SUnitMapping);
   }
   Delete(index:any)
   {
     return this.http.delete(this.localUrl + 'Delete/' + index);
   }
   GetOne(index:any){
     return this.http.get(this.localUrl + 'Find/' + index);
   }
  }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Icustomer } from 'src/app/_Interface/Codes/icustomer';
import { GlobalApiurlService } from '../global-apiurl.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  SIcustomer: Icustomer;
  SIcustomerlist: Icustomer[];
  constructor(
    private http: HttpClient,
    private GlobalAPI: GlobalApiurlService) { }

   // tslint:disable-next-line:quotemark
   localUrl = this.GlobalAPI.URLAPI + "Customers/";
  GetAlldata()
  {
    return this.http.get<Icustomer[]>(this.localUrl + 'Getall');
  }
  Getdata()
  {
    console.log(this.localUrl + 'Getall');
    return this.http.get(this.localUrl + 'Getall');
  }
  putData()
  {
    return this.http.put(this.localUrl + 'Update', this.SIcustomer);
  }

  postData()
  {
    return this.http.post(this.localUrl + 'Save', this.SIcustomer);
  }
  Delete(index:any)
  {
    return this.http.delete(this.localUrl + 'Delete/' + index);
  }
  GetOne(index:any){
    return this.http.get(this.localUrl + 'Find/' + index);
  }}

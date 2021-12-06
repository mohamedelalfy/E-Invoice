import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITransactionsdetails } from 'src/app/_Interface/Transaction/itransactionsdetails';
import { GlobalApiurlService } from '../global-apiurl.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsdetailsService {
  StransactionsD: ITransactionsdetails;
  StransactionsDList: ITransactionsdetails[];
  iEntrytrnsDList:ITransactionsdetails[];
  constructor(
    private http: HttpClient,
    private GlobalAPI: GlobalApiurlService
  ) { }
  
  localUrl = this.GlobalAPI.URLAPI + 'transactionsD/';
  GetAlldata()
  {
    return this.http.get<ITransactionsdetails[]>(this.localUrl + 'Getall', this.GlobalAPI.httpOptions);
  }
  GetallByS(index:any)
  {

    return this.http.get(this.localUrl + 'GetallByS/' + index, this.GlobalAPI.httpOptions);
  }
  GetallRows(index:any,index2:any)
  {

    return this.http.get(this.localUrl + 'GetallRows/' + index+'/'+index2, this.GlobalAPI.httpOptions);
  }
  putData()
  {
    return this.http.put(this.localUrl + 'put', this.StransactionsD, this.GlobalAPI.httpOptions);
  }
  Update(){
   return this.http.put(this.localUrl + 'Update', this.StransactionsDList, this.GlobalAPI.httpOptions);

  }
  SaveList(){
   return this.http.post(this.localUrl + 'SaveList', this.StransactionsDList);

  }

  postData()
  {
    return this.http.post(this.localUrl + 'post', this.StransactionsD, this.GlobalAPI.httpOptions);
  }
  Delete(index:any)
  {
    return this.http.delete(this.localUrl + 'Delete/' + index, this.GlobalAPI.httpOptions);
  }

}

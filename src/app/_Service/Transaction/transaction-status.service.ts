import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITransactionStatus } from 'src/app/_Interface/Codes/itransaction-status';
import { Ireport } from 'src/app/_Interface/report/ireport';
import { GlobalApiurlService } from '../global-apiurl.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionStatusService {

 
  StransactionStatus: ITransactionStatus;
  SReport:Ireport;
  StransactionStatuslist: ITransactionStatus[];
  constructor(
    private http: HttpClient,
    private GlobalAPI: GlobalApiurlService
    ) { }

   // tslint:disable-next-line:quotemark
   localUrl = this.GlobalAPI.URLAPI + "TransactionStatus/";
   localUrl2 = this.GlobalAPI.URLAPI + "InvoiceReport/";
  GetAlldata()
  {
    return this.http.get<ITransactionStatus[]>(this.localUrl + 'Getall');
  }
  InvoiceReport()
  {
    return this.http.post(this.localUrl2 + 'InvoiceReport',this.SReport);
  }
  Reason()
  {
    return this.http.post<ITransactionStatus[]>(this.localUrl2 + 'Reason',this.SReport);
  }
  Getdata()
  {
    return this.http.get(this.localUrl + 'Getall');
  }
  putData()
  {
    return this.http.put(this.localUrl + 'Update', this.StransactionStatus);
  }

  postData()
  {
    return this.http.post(this.localUrl + 'Save', this.StransactionStatus);
  }
  Delete(index:any)
  {
    return this.http.delete(this.localUrl + 'Delete/' + index);
  }
  GetOne(index:any){
    return this.http.get(this.localUrl + 'Find/' + index);
  }
}

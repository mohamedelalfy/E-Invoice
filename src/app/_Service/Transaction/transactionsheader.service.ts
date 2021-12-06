import { HttpClient,HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Ifilterlist } from 'src/app/_Interface/Codes/ifilterlist';
import { IGeneralsetup } from 'src/app/_Interface/Codes/igeneralsetup';
import { Imessslist } from 'src/app/_Interface/Codes/imessslist';
import { IcartDatalist } from 'src/app/_Interface/Transaction/icart-datalist';
import { IchartData } from 'src/app/_Interface/Transaction/ichart-data';
import { IEntrytransactions } from 'src/app/_Interface/Transaction/ientrytransactions';
import { IinvoiceDetails } from 'src/app/_Interface/Transaction/iinvoice-details';
import { ITransactions } from 'src/app/_Interface/Transaction/itransactions';
import { ITransactionsheader } from 'src/app/_Interface/Transaction/itransactionsheader';
import { IValidationobj } from 'src/app/_Interface/Transaction/ivalidationobj';
import { GlobalApiurlService } from '../global-apiurl.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsheaderService {


    // localUrl = 'http://151.106.34.109:7040/api/Groups/';
    StransactionsH: ITransactionsheader;
    StransactionsHList: ITransactionsheader[];
    SItransList: ITransactions[];
    SIEntrytrans:IEntrytransactions;
    Generalsetup: IGeneralsetup;
    chartdata : IcartDatalist;
    public progress: number;
    public message: string;
    @Output() public onUploadFinished = new EventEmitter();
    constructor(
      private http: HttpClient,
      private GlobalAPI: GlobalApiurlService
      ) { }
 
     localUrl = this.GlobalAPI.URLAPI + 'transactionsH/';
     localUrl2 = this.GlobalAPI.URLAPI + 'GetTransaction/';
     localUrl3 = this.GlobalAPI.URLAPI + 'documents/';
     localUrl4 = this.GlobalAPI.URLAPI + 'Generalsetup/';
    GetAlldata()
    {
      return this.http.get<ITransactions[]>(this.localUrl + 'Getall', this.GlobalAPI.httpOptions);
    }
    Find()
    {
      return this.http.get<IGeneralsetup>(this.localUrl4 + 'Find', this.GlobalAPI.httpOptions);
    }
    uploadFile(formData: FormData) {  
     let headers = new HttpHeaders();  
   
     headers.append('Content-Type', 'multipart/form-data');  
     headers.append('Accept', 'application/json');  
   
     const httpOptions = { headers: headers };  
   console.log(this.localUrl2 + 'Upload'+formData);
     return this.http.post<ITransactionsheader[]>(this.localUrl2 + 'Upload', formData, httpOptions)  
   }  
    GetTransaction()
    {
      return this.http.get<ITransactionsheader[]>(this.localUrl2 + 'GetTransaction', this.GlobalAPI.httpOptions);
    }
    Validation(index:any)
    {
      return this.http.post<IValidationobj[]>(this.localUrl3 + 'Validation', index,
      this.GlobalAPI.httpOptions);
    }
    DeleteList(index:any)
    {
      return this.http.post<IValidationobj[]>(this.localUrl + 'DeleteList', index,
      this.GlobalAPI.httpOptions);
    }
    SubmittoETA(index:any)
    {
      return this.http.post<Imessslist>(this.localUrl3 + 'SubmittoETA', index,
      this.GlobalAPI.httpOptions);
    }
    UpdateDiscount(index:any)
    {
 
      return this.http.post<Imessslist>(this.localUrl + 'UpdateDiscount', index
      );
    }
    UpdateInvoiceStatus()
    {
      return this.http.get<ITransactions[]>(this.localUrl + 'UpdateInvoiceStatus', 
      this.GlobalAPI.httpOptions);
    }
    UpdateInvoiceStatusFilter(list:any)
    {
      return this.http.post<ITransactions[]>(this.localUrl + 'UpdateInvoiceStatusFilter', list,
      this.GlobalAPI.httpOptions);
    }
    GetallByS(index:any)
    {
 
      return this.http.get(this.localUrl + 'GetallByS/' + index, this.GlobalAPI.httpOptions);
    }
    GetallBySEntry()
    {
 
      return this.http.get(this.localUrl + 'GetallBySEntry/' ,this.GlobalAPI.httpOptions);
    }
 
    LastExtractDate()
    {
 
      return this.http.get<Date>(this.localUrl + 'LastExtractDate', this.GlobalAPI.httpOptions);
    }
    putData()
    {
      return this.http.put(this.localUrl + 'put', this.StransactionsH, this.GlobalAPI.httpOptions);
    }
 
    postData()
    {
      return this.http.post(this.localUrl + 'post', this.StransactionsH, this.GlobalAPI.httpOptions);
    }
    Save()
    {
      return this.http.post(this.localUrl + 'Save', this.StransactionsH, this.GlobalAPI.httpOptions);
    }
    Update(){
     return this.http.put(this.localUrl + 'Update', this.StransactionsH, this.GlobalAPI.httpOptions);
 
    }
    SaveManualTrans(){
      console.log(this.localUrl +'SaveManualTrans');
     return this.http.post(this.localUrl +'SaveManualTrans',this.SIEntrytrans);
 
    }
    Delete(index:any)
    {
      return this.http.delete(this.localUrl + 'Delete/' + index);
    }
    Deletetrns(index:any,index2:any)
    {
      return this.http.delete(this.localUrl + 'Deletetrns/' + index+"/"+ index2);
    }
    Getall2Async()
    {
      console.log(
      this.GlobalAPI.httpOptions2);
      return this.http.get('https://fa-epbd-test-saasfaprod1.fa.ocs.oraclecloud.com//fscmRestApi/resources/11.13.18.05/receivablesInvoices',
       this.GlobalAPI.httpOptions2);
    }
    getEInvoiceDetails(index:Ifilterlist){
     return this.http.post<IinvoiceDetails>(this.localUrl +'getEInvoiceDetails',index)
   }
   GetChartData (FromDate:string , ToDate:string ){
     return this.http.get <IchartData[]>(this.localUrl+ 'GetChartData/'+FromDate+"/"+ToDate)
   }
   GetChartDataM (year : number){
     return this.http.get <IchartData[]>(this.localUrl+ 'GetChartDataM/'+year)
   }
 }

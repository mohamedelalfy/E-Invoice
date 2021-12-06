import { ITransactionsdetails } from "./itransactionsdetails";

export interface IEntrytransactions {
    eRPTransactionID ?:String;
    documentType?:String;
    dateTimeIssued?:Date
    additionalInformation?:String;
    customerName?:string;
    eRPCurrencyCode?:string;
    exchangeRate?:number;
    totalSalesAmount?:number;
    totalVAT?:number;
    totalWHT?:number;
    totalItemsDiscountAmount?:number;
    netAmount?:number;
    IentrytrnsD?: ITransactionsdetails[];

}

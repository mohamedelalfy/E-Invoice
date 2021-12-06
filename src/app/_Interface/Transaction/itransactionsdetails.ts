export interface ITransactionsdetails {
    
    transactionSerialD?: number;
    erpTransactionID?: string;
    customerTransactionLineId?: string;
    internalCode?: string;
    erpItemDesc?: string;
    itemType?: string;
    itemCode?:string;
    unitType?:string;
    quantity?:number;
    unitPrice?: number;
    eqUnitPrice?: number;
    eqPrice?:number;
    currencyExchangeRate?: number;
    salesTotal?: number;
    vatAmount?: number;
    whtAmount?: number;
    totalTaxableFees?: number;
    itemsDiscountAmount?: number;
    total?: number;
    documentType?: string;
    eqsalesTotal ?:number
    eqVATAmount?:number
    eqWHTAmount ?:number
    eqitemsDiscountAmount?:number
    eqtotal ?:number
    tableTaxAmount ?:number
    eqTableTaxAmount ?:number
    tableTaxPercentage?:number

}

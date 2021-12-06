export interface ITransactions {
    
    erpTransactionID: string;
    erpTransactionNumber: string;
    DateTimeIssued: Date;
    documentType: string;
    customerCodecustomerTaxId: string;
    totalSalesAmount: number;
    extracted: string;
    validated: string;
    submitted: string;
    transactionSerial: number;
    customerCode: string;
    Selectyn:boolean;
    dateTimeIssued?: Date;
    transactionDescription?: string;
    customerType?: string;
    customerName?: string;
    customerTaxId?: string;
    countryName?: string;
    governorateName?: string;
    regionName?: string;
    street?: string;
    buildingNumber?: string;
    postalCode?: string;
    floor?: string;
    room?: string;
    landmark?: string;

    additionalInformation?: string;
    eRPCurrencyCode?: string;
    exchangeRate?: number;


    totalDiscountAmount?: number;
    netAmount?: number;
    totalVAT?: number;
    totalWHT?: number;
    extraDiscountAmount?: number;
    totalItemsDiscountAmount?: number;
    totalAmount?: number;
    transactionStatusCode?: number;
    eRPCreationDateTime?: Date;
    ref?: string;
  
    ETAID?: string;
}

export interface Icustomer {
    
    customerSerial: number;
    customerCode: string;
    customerName: string;
    customerEngName: string;
    countryCode: string;
    countryName: string;


    governorateCode: string;
    governorateName: string;
    regionCode: string;
    regionName: string;
    street: string;
    buildingNumber: string;
    postalCode: string;

    floor: string;
    room: string;
    landmark: string;
    additionalInformation: string;
    taxId: string;
     // tslint:disable-next-line:ban-types
     vATExemptionYN: Boolean;

}

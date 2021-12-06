import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Ireport } from 'src/app/_Interface/report/ireport';
import { TransactionsheaderService } from 'src/app/_Service/Transaction/transactionsheader.service';
import { TransactionsdetailsService } from 'src/app/_Service/Transaction/transactionsdetails.service';
import { TransactionStatusService } from 'src/app/_Service/Codes/transaction-status.service';
import { AgGridCheckboxComponent } from '../../shared/ag-grid-checkbox/ag-grid-checkbox-component.component';
const EXCEL_EXTENSION = '.xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';


@Component({
  selector: 'app-transactions-report',
  templateUrl: './transactions-report.component.html',
  styleUrls: ['./transactions-report.component.scss']
})
export class TransactionsReportComponent implements OnInit {
  rowData: any;
  rowData2: any;
  insert = false;
  showyn= false;
  imagehide = true;
  fromday: string;
  today: string;
  
  Data: any;
  public defaultColDef:any;
  private gridApi:any;
  private gridApi2:any;
  isSubmitted = false;
  rowSelection = 'single';
  eDate: Date;
  rowSelection2 = 'single';
  displayItemNameList = '';
  title: string;
  modalRef: BsModalRef;
  public InvoiceStatusList: any;
  public Statusoice: any;
  GroupDelete:string|null = '0';
  GroupInsert = '0';
  GroupEdit:string|null = '0';
  CustomerView: any;
  ISReport:Ireport;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('agGrid') agGrid2: AgGridAngular;
  public Rtl = localStorage.getItem('textDir') === 'ltr' ? false : true;
  columnDefs = [
    {headerName: 'FromDate', cellRendererFramework: AgGridCheckboxComponent, field: 'selectyn' ,width: 210},
    {headerName:  'ToDate' , field: 'extracted',  width: 200 , sortable: true, filter: true},
    {headerName: 'Custcode', field: 'validated',  width: 200 , sortable: true, filter: true},
    {headerName: 'Custtype', field: 'submitted',  width: 200 , sortable: true, filter: true},
    {headerName: 'StatusCode', field:'documentType',  width: 200 , sortable: true, filter: true},
    {headerName: 'DocumentType', field: 'erpTransactionNumber',width: 200 , sortable: true, filter: true},
    

  ];
  
  constructor(
    public objServ: TransactionsheaderService,
    private modalService: BsModalService,
    public objServ2: TransactionsdetailsService,
    public onjtransactionStatusservice: TransactionStatusService

    ) {

this.onjtransactionStatusservice.SReport=
{
 custType:'',
 custCode:'',
 documentType:'',
 fromDate:null,
 statusCode:0,
 toDate:null

}
      this.defaultColDef = { resizable: true };
      this.today = new Date().toISOString().split('T')[0];
      this.fromday = new Date().toISOString().split('T')[0];
      if (localStorage.getItem('GroupDelete') != null ||
     localStorage.getItem('GroupDelete') !== ''
 
    )
    {
    this.GroupDelete = localStorage.getItem('GroupDelete');
    }
 
      if (localStorage.getItem('GroupInsert') != null ||
    localStorage.getItem('GroupInsert') !== ''
 
   )
   {
        this.GroupInsert = '0';
   }
      if (localStorage.getItem('GroupEdit') != null ||
   localStorage.getItem('GroupEdit') !== ''
 
  )
  {
 this.GroupEdit = localStorage.getItem('GroupEdit');
 
  }
      this.reset();

  }
  ngOnInit(): void {
    
  }
  FilterDate()
  {
    // this.spinner.show();
    this.onjtransactionStatusservice.SReport=
    {
     custType:'',
     custCode:'',
     documentType:'',
     fromDate: new Date(this.fromday),
     statusCode:0,
     toDate:new Date(this.today)
    
    }
      this.rowData =  this.onjtransactionStatusservice.InvoiceReport();
      setTimeout(() => {

        // this.spinner.hide();
        }, 1000);
  }
 
  ExportExcel(): void {
    // this.spinner.show();
    this.onjtransactionStatusservice.SReport=
    {
     custType:'',
     custCode:'',
     documentType:'',
     fromDate: new Date(this.fromday),
     statusCode:0,
     toDate:new Date(this.today)
    
    }
    this.onjtransactionStatusservice.InvoiceReport().subscribe(res => {
      this.CustomerView = res;
      this.exportAsExcelFile(this.CustomerView, 'CustomerData');
      setTimeout(() => {
        // this.spinner.hide();
      }, 1000);
    })
  }
  public exportAsExcelFile(json: any[], excelFileName: string): void {

    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const myworkbook: XLSX.WorkBook = { Sheets: { 'data': myworksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_exported' + EXCEL_EXTENSION);
  }
  onChangeSelectionaInvoiceStatus(params:any) {
    this.displayItemNameList = '';
    if (params != null)
    {
    // this.spinner.show();
    this.rowData = this.objServ.GetallByS(params);
    this.Statusoice = params;
    setTimeout(() => {
      // this.spinner.hide();
      }, 1000);

    }
    else {
    this.rowData = this.objServ.GetallByS(-1);
    }


  }
  onrowDoubleClicked(params:any) {
    this.displayItemNameList = '';
    if (this.GroupEdit === '0') {
return;
}


    this.UpdateRecord();

   }
   CancelSave() {
    this.insert = false;
    this.reset();
    this.gridApi?. deselectAll();

  }
  reset()
  {
    this.displayItemNameList = '';
    this.objServ.StransactionsH =
    {

      transactionSerial: 0,
      additionalInformation: '',
      buildingNumber: '',
      floor: '', postalCode: '',
      room: '', street: '', landmark: ''
      , countryName: '',
      customerName: '', customerTaxId: '', customerType: '',
      dateTimeIssued: null, documentType: 'I', eRPCurrencyCode: '',
      eRPCreationDateTime: null, exchangeRate: 0, extraDiscountAmount: 0, governorateName: '',
      netAmount: 0, ref: '', regionName: '',
      totalAmount: 0, totalDiscountAmount: 0, totalItemsDiscountAmount: 0, totalSalesAmount: 0,
      totalVAT: 0, totalWHT: 0, transactionDescription: '', 
      transactionStatusCode: 1, customerCode: '', erpTransactionID: '',eqTotalTableTaxAmount:0,totalTableTaxAmount:0,
      validationNotes:'',eRPTransactionNumber:'',eTAID:'',eqTotalAmount:0,eqTotalItemsDiscountAmount:0,
      eqExtraDiscountAmount:0,eqTotalWHT:0,eqTotalVAT:0,eqNetAmount:0,eqTotalDiscountAmount:0,eqTotalSalesAmount:0,


    };
    this.gridApi?. deselectAll();

  }
  onGridReady(params:any) {
    this.gridApi = params.api;
    this.rowData = this.objServ.GetallByS(0);
  }
  onGridReady2(params:any) {
    this.gridApi2 = params.api;


  }
  Addnewrecord()
  {
    this.reset();
    this.imagehide = true;
    this.insert = true;
  }
  UpdateInvoiceStatus(){
    if (confirm('Are You Sure , Check Transaction Status?'))
    {
      // this.spinner.show();

      this.objServ.UpdateInvoiceStatus()
      .subscribe(
        data => {
          this.rowData = this.objServ.GetallByS(2);
          alert('Check Transaction Done   ');
          setTimeout(() => {
            // this.spinner.hide();
            }, 1000);
        },
        err => {
          setTimeout(() => {
            alert(err);
            // this.spinner.hide();
            }, 1000);
        },
        () => console.log('yay')
      );
    
 
    }

  }
  eventCheck(event:any){
    console.log(this.showyn)
    const items: any[] = [];
    this.gridApi.forEachNode(function (node:any) {
      items.push(node.data);
    });

    for (const i in items) {
     items[i].selectyn=this.showyn;
     this.gridApi.api.updateRowData({

      updateRowData: [ items[i]]
    });

    }
    // tslint:disable-next-line: only-arrow-functions

 



}
  UpdateRecord()
  {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1)
    {

      this.objServ.StransactionsH = selectedRows [0];
      this.rowData2 = this.objServ2.GetallByS(this.objServ.StransactionsH.erpTransactionID);
      this.insert = true;
    }
    else
    {
      alert('Must select Record to edit');
    }
  }
  onSelectionChanged(params:any) {

    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1)
    {
    this.objServ.StransactionsH = selectedRows [0];

    }
  }
  hide()
  {
    this. modalRef.hide();
  }
  onSubmit(f: NgForm)
  {




  }

  Delete(index: number)
  {
    if (confirm('Are You Sure ?'))
    {
      this.objServ.Delete(index).subscribe((data:any) =>
      {
        this.rowData = this.objServ.Delete(index);
        this.insert = false;
      });
    }

  }
}

import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { TranslateService } from '@ngx-translate/core';
import { TransactionsheaderService } from 'src/app/_Service/Transaction/transactionsheader.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TransactionStatusService } from 'src/app/_Service/Codes/transaction-status.service';
import { VacationapproveAgBtnComponent } from '../../shared/ag-grid-checkbox - Copy/vacationapprove-ag-btn.component';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-all-recent-documents',
  templateUrl: './all-recent-documents.component.html',
  styleUrls: ['./all-recent-documents.component.scss']
})
export class AllRecentDocumentsComponent implements OnInit {

  rowData: any;
  rowData2: any;
  insert = false;
  showyn= false;
  imagehide = true;
  fromday: string;
  today: string;
  StatusCode:0;
  Data: any;
  public defaultColDef:any;
  private gridApi:any;
  private gridApi2:any;
  public InvoiceType='0';
  isSubmitted = false;
  rowSelection = 'single';
  eDate: Date;
  rowSelection2 = 'single';
  displayItemNameList = '';
  title: string;
  modalRef: BsModalRef;
  public InvoiceStatusList: any;
  public Statusoice: any;
  GroupDelete = '0';
  FilteredList: any[] = [];
  GroupInsert = '0';
  GroupEdit = '0';
  CustomerView: any;
  frameworkComponents = {
    btnCellRenderer:VacationapproveAgBtnComponent
  };
  @ViewChild('agGrid') agGrid: AgGridAngular;

  public Rtl = localStorage.getItem('textDir') === 'ltr' ? false : true;
  columnDefs:ColDef[] = [
  
    

  ];
  
  constructor(
    public objServ: TransactionsheaderService,
    private translate: TranslateService,
    private modalService: BsModalService,
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
            this.reset();
  }
  ngOnInit(): void {
    
  }

   currencyFormatter(currency:any , sign:any ){
    return  this.formatNumber(currency);
  }
   formatNumber(number:any) {
    return Math.floor(number)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  
  FilterDate()
  {

    this.onjtransactionStatusservice.SReport=
    {
     custType:'',
     custCode:'',
     documentType:this.InvoiceType,
     fromDate: new Date(this.fromday),
     statusCode:0 ,
     toDate:new Date(this.today)
    
    }
  
    this.onjtransactionStatusservice.GetAllRecentdocuments().subscribe(res=>{
      this.FilteredList = [];
      this.FilteredList=res;
      var xc=Object.keys(this.FilteredList[0]) 


this.gridApi.setColumnDefs([]);
this.columnDefs=[];
for(let element of xc){

var xz=element.split(',');

xz.forEach(element1 => {
  if(element1=='documentTypeNamePrimaryLang'||
  element1=='internalId'||element1=='uuid'||
  element1=='issuerId'||element1=='issuerName'||
  element1=='receiverId'||element1=='receiverName'||
  element1=='dateTimeIssued'||element1=='dateTimeReceived'||
  element1=='totalSales'||element1=='totalDiscount'||
  element1=='netAmount'||element1=='total'
  || element1=='status'
  ||element1=='typeName'
  ||element1=='invoiceLineItemCodes')
  {
    if(element1=='totalSales'||element1=='totalDiscount'||
    element1=='netAmount'||element1=='total')
    {
       
      var  col:ColDef= { headerName: element1, field:element1, width: 200, sortable: true, filter: true,
        cellClass: 'number-cell',
        valueFormatter: (params: { value: any; }) =>this.currencyFormatter(params.value,'$') }
      
      this.columnDefs.push(col);
    }
    else if(element1=='invoiceLineItemCodes')
    {
  
      var col3= { headerName: "Seles Tax", field:element1, width: 200, sortable: true, filter: true,
       
        valueFormatter: (params: { value: any; }) =>this.currencyFormatter(params.value,'$') }
      this.columnDefs.push(col3);
    }
    else{
      var col1= { headerName: element1, field:element1, width: 200, sortable: true, filter: true }
      this.columnDefs.push(col1);
    }
  }

});


};
var col4= {
  field: "Download",
  width: 200,

  cellRenderer: "btnCellRenderer",
  cellRendererParams: {
    clicked:(field: any) =>
    setTimeout(() => {
      console.log(this.rowSelection2);
      this.DownloadInvoice()
    }, 1000)
    ,
     classValue:"fas fa-file-pdf",
     btnText:"accept",
     color:"info"
  },
};
  this.columnDefs.push(col4);
  this.gridApi.setColumnDefs(this.columnDefs);
  this.agGrid.gridOptions.api!.setRowData(this.FilteredList);
  // this.rowData =  this.onjtransactionStatusservice.InvoiceReport();

    });
   
  }
  DownloadInvoice() {
    try
    {
      // this.spinner.show();
      const selectedRows = this.gridApi.getSelectedRows();
      if (selectedRows != null && selectedRows.length === 1)
      {
        
        this.onjtransactionStatusservice.getPDF(selectedRows[0].uuid)
        .subscribe(
          (data: Blob) => {
            var file = new Blob([data], { type: 'application/pdf' })
            var fileURL = URL.createObjectURL(file);
  
  // if you want to open PDF in new tab
            window.open(fileURL); 
            var a         = document.createElement('a');
            a.href        = fileURL; 
            a.target      = '_blank';
            a.download    = selectedRows[0].internalId+'.pdf';
            document.body.appendChild(a);
            a.click();
            // this.spinner.hide();
          },
          (error:any) => {
            // this.spinner.hide();
            console.log('getPDF error: ',error);
          }
        );
        }
    }
    catch{
      // this.spinner.hide();
    }
  
  }

 




  reset()
  {

    this.gridApi?. deselectAll();

  }
  onGridReady(params:any) {
    this.gridApi = params.api;
  
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

  hide()
  {
    this. modalRef.hide();
  }


}

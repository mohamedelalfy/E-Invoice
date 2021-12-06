import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TransactionsheaderService } from 'src/app/_Service/Transaction/transactionsheader.service';
import { TransactionsdetailsService } from 'src/app/_Service/Transaction/transactionsdetails.service';
import { TransactionStatusService } from 'src/app/_Service/Codes/transaction-status.service';
import { Ifilterlist } from 'src/app/_Interface/Codes/ifilterlist';
import { IinvoiceDetails } from 'src/app/_Interface/Transaction/iinvoice-details';
import { IUpdateDiscount } from 'src/app/_Interface/Codes/iupdate-discount';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { AgGridCheckboxComponent } from '../../shared/ag-grid-checkbox/ag-grid-checkbox-component.component';


const EXCEL_EXTENSION = '.xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';


@Component({
  selector: 'app-transaction-management',
  templateUrl: './transaction-management.component.html',
  styleUrls: ['./transaction-management.component.scss']
})
export class TransactionManagementComponent implements OnInit {
  rowData: any;
  rowData2: any;
  rowData3: any;
  public sumTotalAmount = 0;
  insert = false;
  showyn= false;
  imagehide = true;
  ifilterlist:Ifilterlist;
  ifilterlistcount:Ifilterlist
  Data: IinvoiceDetails;
  public defaultColDef:any;
  private gridApi:any;
  private gridApi2:any;
  isSubmitted = false;
  rowSelection = 'single';
  extraDiscountvalue=0;
  eDate: Date;
  rowSelection2 = 'single';
  displayItemNameList = '';
  title: string;
  UsingDiscount=true;
  modalRef: BsModalRef;
  public InvoiceStatusList: any;
  public Statusoice: any;
  public StatusCode=1;
  GroupDelete:string|null ;
  fromday: string;
  today: string;
  iUpdateDiscount:IUpdateDiscount
  Useexcel=0;
  GroupInsert = '0';
  FilteredList: any[] = [];
  GroupEdit:string|null;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('agGrid') agGrid2: AgGridAngular;



  
  public Rtl = localStorage.getItem('textDir') === 'ltr' ? false : true;
  columnDefs = [
    {headerName: 'Select', cellRendererFramework: AgGridCheckboxComponent, field: 'selectyn',width: 80},
    {headerName: this.Rtl ? 'Extracted':'Extracted', field: 'extracted',width: 120, sortable: true,filter: true, pinnedRowCellRenderer: function (params:any) { return '<strong>' + params.data.extracted + '</strong>'},},
    {headerName: this.Rtl ? 'Validated':'Validated', field: 'validated',width: 120, sortable: true,filter: true},
    {headerName: this.Rtl ? 'TransactionStatusCode' :'TransactionStatusCode', field: 'transactionStatusCode',width: 130, hide: true , sortable: true, filter: true},
    {headerName: this.Rtl ? 'Submitted':'Submitted', field: 'submitted',width: 130, sortable: true,filter: true},
    {headerName: this.Rtl ? 'Transaction Type':'Transaction Type', field:'documentType',width: 160,sortable: true, filter: true},
    {headerName: this.Rtl ? 'Transaction Key':'Transaction Key', field: 'erpTransactionID',width: 130 , sortable: true,hide:true, filter: true},
    {headerName: this.Rtl ? 'Transaction Number':'Transaction Number', field: 'erpTransactionNumber', width: 170 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'Transaction Description':'Transaction Description', field:'transactionDescription',  sortable: true, filter: true},
    {headerName: this.Rtl ? 'Transaction Date':'Transaction Date', field:'dateTimeIssued',  width: 170 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'Customer Code':'Customer Code', field:'customerCode',  width: 150 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'Customer Name':'Customer Name', field: 'customerName',width: 200, sortable: true, filter: true},
    {headerName: this.Rtl ? 'Total  Amount':'Total  Amount', field: 'totalAmount',  width: 150 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'Customer Tax ID' :'Customer Tax ID', field: 'customerCodecustomerTaxId',  width: 150 , sortable: true, filter: true},
  ];
  series: [
    {
      xKey: 'dateTimeIssued',
      yKey: 'totalAmount',
    },
  ]
  columnDefs2 = [
    {headerName: this.Rtl ? 'internal Code' : 'ERP Item Code', field: 'internalCode',  width: 130 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'Item Desc': 'ERP Item Desc', field: 'erpItemDesc',  width: 120 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'item Code': 'GPC item Code', field: 'itemCode',hide:true,  width: 150 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'quantity': 'Quantity', field: 'quantity',  width: 110 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'Unit Price' :'Unit Price', field: 'unitPrice',  width: 150 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'sales Total':'Sales Total', field: 'salesTotal',  width: 150 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'vAT Amount':'VAT Amount ', field: 'vatAmount',  width: 150 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'wHT Amount' :'WHT Amount ', field: 'whtAmount',  width: 150 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'totalTaxableFees' :'TotalTaxableFees', field: 'totalTaxableFees',  width: 200 , sortable: true, filter: true,hide:true},
    {headerName: this.Rtl ? 'itemsDiscountAmount' :'Items Discount Amount', field: 'itemsDiscountAmount',  width: 200 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'total' :'Total', field: 'total',  width: 200 , sortable: true, filter: true}
  ];
  file: File;
  @ViewChild('fileInput') fileInput:any; 
  gridColumnApi: any;
  constructor(
    public objServ: TransactionsheaderService,
    public objServ2: TransactionsdetailsService,
    // private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private modalService: BsModalService,
    public onjtransactionStatusservice: TransactionStatusService,
    public datepipe: DatePipe,
    public trxh: TransactionsheaderService 
    ) {
    
      this.ifilterlist=
      {
        fromdate:null,
         todate:null,
         fromserial:'',
         toserial:'',
         documentType:'0'
      }
      this.ifilterlistcount=
      {
        fromdate:null,
         todate:null,
         fromserial:'',
         toserial:'',
         documentType:'0'
      }
      this.Data={
        totalNumOfCinvoice:0,
        totalNumOfExctractinvoice:0,
        totalNumOfIinvoice:0,
        totalNumOfSubmitedinvoice:0,
        totalNumOfValidatinvoice:0,
      }
      this.trxh.getEInvoiceDetails(this.ifilterlistcount).subscribe(res=>{
        this.Data=res;
      })
      this.today = new Date().toISOString().split('T')[0];
      this.fromday = new Date().toISOString().split('T')[0];
this.objServ.Find().subscribe(c=>{
  this.Useexcel=c.environmentId;
  if(c.environmentId===1)
  {
    this.UsingDiscount=false;
  }


});
      this.defaultColDef = { resizable: true };
      this.onjtransactionStatusservice.GetAlldata().subscribe(res => this.InvoiceStatusList = res
        );
        


  }
  ngOnInit(): void {
  

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
  onChangeSelectionatodate(){
    if(this.ifilterlistcount.fromdate==null||this.ifilterlistcount.todate==null)
    return;
    // this.spinner.show();
    this.trxh.getEInvoiceDetails(this.ifilterlistcount).subscribe(res=>{
      this.Data=res;
      setTimeout(() => {
        // this.spinner.hide();
        }, 1000);
    })
  }
  onChangeSelectionafromdate(){
    if(this.ifilterlistcount.fromdate==null||this.ifilterlistcount.todate==null)
    return;
    // this.spinner.show();
    this.trxh.getEInvoiceDetails(this.ifilterlistcount).subscribe(res=>{
      this.Data=res;
      setTimeout(() => {
        // this.spinner.hide();
        }, 1000);
    })
  }

  hide2()
  {
    this. modalRef.hide();
  }
  onSubmitserch()
  {

  }
  UpdateDiscount()
  {
    if(this.extraDiscountvalue==null||this.extraDiscountvalue==0)
    {
      alert("Please enter extra Discount ");
      return;
    }
    
  // this.spinner.show();
  this.iUpdateDiscount={
  discount:parseInt(this.extraDiscountvalue.toString()) ,
  documentType:this.objServ.StransactionsH.documentType?.toString(),
  erpTransactionID:this.objServ.StransactionsH.erpTransactionID?.toString()
}

try{
  
  this.objServ.UpdateDiscount(this.iUpdateDiscount).subscribe(res=>{
 
 
  alert(res.mess.toString());
  setTimeout(() => {
    // this.spinner.hide();
    }, 1000);
    this.extraDiscountvalue=0;
   this.CancelSave();

}
)
}
catch{
  setTimeout(() => {
    // this.spinner.hide();
    }, 1000);
}
  }
  serarch(template: TemplateRef<any>)
  {
    this.title = 'Serach';
    this.ifilterlist=
    {
      fromdate:null,
       todate:null,
       fromserial:'',
       toserial:'',
       documentType:'0'
    }
    this.modalRef = this.modalService.show(template);
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
    FileSaver.saveAs(data, fileName +EXCEL_EXTENSION);
  }
  ExtractTransaction()
  {
    this.displayItemNameList = '';
    if (confirm('Are You Sure , Extract Transaction?'))
    {
      // this.spinner.show();
      if(this.Useexcel===105)
      {
        let formData = new FormData();  
        if(this.fileInput.nativeElement.files[0]==null)
        {
          alert('Error, You Must Select A File   ');
          // this.spinner.hide();
          return;
        }
 
      
        formData.append('upload', this.fileInput.nativeElement.files[0])  
        this.objServ.uploadFile(formData).subscribe(result => { 
          alert('Done , No Extract Transaction   ' + result.length);
          this.StatusCode=1;
          this.  onChangeSelectionaInvoiceStatus( this.StatusCode);
          setTimeout(() => {
            // this.spinner.hide();
            }, 1000);

      
       
        } ,err => {
          setTimeout(() => {
            alert(err);
             alert('serror');
            this.StatusCode=1;
            this.  onChangeSelectionaInvoiceStatus( this.StatusCode);
            // this.spinner.hide();
            }, 1000);

        },
        () => console.log('yay')); 
      }
      else
      {
      this.objServ.GetTransaction()
      .subscribe(
        data => {
          this.rowData = this.objServ.GetallByS(1);
          alert('Done , No Extract Transaction   ' + data.length);
          setTimeout(() => {
            // this.spinner.hide();
            }, 1000);
          this.objServ.LastExtractDate().subscribe(res =>
             { this.eDate = res
              this.StatusCode=1;
              this.  onChangeSelectionaInvoiceStatus( this.StatusCode);
                 
             });

        },
        err => {
          setTimeout(() => {
            alert(err);
            this.StatusCode=1;
            this.  onChangeSelectionaInvoiceStatus( this.StatusCode);
            // this.spinner.hide();
            }, 1000);
        },
        () => console.log('yay')
      );
    }
  }
  }
  ValidateTransactions()
  {
    if (confirm('Are You Sure , Validate Transaction?'))
    {
      // this.spinner.show();
      const items: any[] = [];
      // tslint:disable-next-line: only-arrow-functions
      this.gridApi.forEachNodeAfterFilter(function(node:any) {
        items.push(node.data);
        
      });
      var list;

      
      if(this.showyn)
      {
         list =  items.filter(x => x.transactionStatusCode === 1);
      }
      else{
         list =  items.filter(x => x.cbox && x.transactionStatusCode === 1);
      }
          
    

      if (list != null && list.length > 0)
      {

      this.objServ.Validation(list)
      .subscribe(
        data => {
          this.StatusCode=2;
        
          this.  onChangeSelectionaInvoiceStatus( this.StatusCode);
          this.rowData = this.objServ.GetallByS(2);

          if (data != null && data.length > 0)
          {
            if (confirm('Export Validation List As Excel?'))
            {
            this.exportAsExcelFile(data, 'ValidationList');
            }
            data.forEach(element => {
              this.displayItemNameList =
              this.displayItemNameList + '' +
              element.code + '_' + element.name + ' , ';
            });

          }
          else
          {
            this.displayItemNameList = '';
            this.StatusCode=2;
            this. onChangeSelectionaInvoiceStatus( this.StatusCode);
          }
          alert('Done , Validate Transaction   ');
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
    else
    {
      alert('No Row Seleted');
      setTimeout(() => {
        // this.spinner.hide();
        }, 1000);
    }
    }
  }

  DeleteTransaction()
  {
    if (confirm('Are You Sure , Delete Transaction?'))
    {
      // this.spinner.show();
      const items: any[] = [];
      // tslint:disable-next-line: only-arrow-functions
      this.gridApi.forEachNodeAfterFilter(function(node:any) {
        items.push(node.data);
      });
      var list;
      if(this.showyn)
      {
         list =  items.filter(x => (x.transactionStatusCode === 2 ||(x.transactionStatusCode === 1)));
      }
      else{
         list =  items.filter(x => x.cbox && (x.transactionStatusCode === 2 ||(x.transactionStatusCode === 1) ));
      }
     
    

      if (list != null && list.length > 0)
      {

      this.objServ.DeleteList(list).subscribe(res=>{
        alert('deleted');
        setTimeout(() => {
          // this.spinner.hide();
          }, 1000);
      
      });
    }
    else
    {
      alert('No Row Seleted');
      setTimeout(() => {
        // this.spinner.hide();
        }, 1000);
    }
    }
  }
  SubmittoETA(){
    if (confirm('Are You Sure , Submit to ETA?'))
    {
      // this.spinner.show();
      const items: any[] = [];
      // tslint:disable-next-line: only-arrow-functions
      this.gridApi.forEachNodeAfterFilter(function(node:any) {
        items.push(node.data);
      });
      var list;
if(this.showyn)
{
   list =  items.filter(x => x.transactionStatusCode === 2);
}
else{
   list =  items.filter(x => x.cbox && x.transactionStatusCode === 2);
}
 
      if (list != null && list.length > 0)
      {

      this.objServ.SubmittoETA(list)
      .subscribe(
        data => {
          this.StatusCode=3;
        this.  onChangeSelectionaInvoiceStatus( this.StatusCode);
          alert(data.mess.toString());
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
    else
    {
      alert('No Row Seleted');
      setTimeout(() => {
        // this.spinner.hide();
        }, 1000);
    }
    }

  }
  async onChangeSelectionaInvoiceStatus(StatusCode2:any) {
    this.displayItemNameList = '';
    if (StatusCode2 != null)
    {
    // this.spinner.show();
 
 await this.FillGrid(StatusCode2);
  

    }
    else {

 
   this.FillGrid(0);
    }


  }
  async FillGrid(st:number){
    this.rowData =await this.objServ.GetallByS(st);
    
    setTimeout(() => {
      // this.spinner.hide();
      }, 1000);
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
    this.objServ.StransactionsH ={
      transactionSerial: 0,
      additionalInformation: '',
      buildingNumber: '',
      floor: '',
      postalCode: '',
      room: '',
      street: '',
      landmark: '',
      countryName: '',
      customerName: '',
      customerTaxId: '',
      customerType: '',
      dateTimeIssued:  null,
      documentType: 'I',
      eRPCurrencyCode: '',
      eRPCreationDateTime: null,
      exchangeRate: 0,
      extraDiscountAmount: 0,
      governorateName: '',
      netAmount: 0,
      ref: '',
      regionName: '',
      totalAmount: 0,
      totalDiscountAmount: 0,
      totalItemsDiscountAmount: 0,
      totalSalesAmount: 0,
      totalVAT: 0,
      totalWHT: 0,
      transactionDescription: '', 
      transactionStatusCode: 1,
      customerCode: '',
      erpTransactionID: '',
      eqTotalTableTaxAmount:0,
      totalTableTaxAmount:0,
      validationNotes:'',
      eRPTransactionNumber:'',
      eTAID:'',eqTotalAmount:0,
      eqTotalItemsDiscountAmount:0,
      eqExtraDiscountAmount:0,
      eqTotalWHT:0,
      eqTotalVAT:0,
      eqNetAmount:0,
      eqTotalDiscountAmount:0,
      eqTotalSalesAmount:0,


    };
    this.gridApi?. deselectAll();

  }
  onfilterChanged(params:any) {
this. GetTotalAmountSum();
  }
  onrowDataUpdatedChanged(params:any)
  {
    
    this. GetTotalAmountSum();
  }
  GetTotalAmountSum()
  {
    const items: any[] = [];
    // tslint:disable-next-line: only-arrow-functions
    this.gridApi.forEachNodeAfterFilter(function(node:any) {
      items.push(node.data);
      
    });
    
 
    this. sumTotalAmount= 0;
    for(let i = 0; i < items.length; i++) {
      if(items[i].documentType=='I')
     this. sumTotalAmount +=items[i].totalAmount;
     else
     this. sumTotalAmount -=items[i].totalAmount;
    }
    this. sumTotalAmount=parseFloat(this. sumTotalAmount.toFixed(2));
  }
  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData =  this.FillGrid(1);
 
    this.objServ.LastExtractDate().subscribe(res =>
      this.eDate = res
     
      
      

      ); 
      

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
    
this.ifilterlist.fromdate=
new Date(this.fromday);
this.ifilterlist.todate=
new Date(this.today);

      this.objServ.UpdateInvoiceStatusFilter(this.ifilterlist)
      .subscribe(
        data => {
       
          this.rowData = this.objServ.GetallByS(2);
          alert('Check Transaction Done   ');
         
          setTimeout(() => {
            // this.spinner.hide();
            }, 1000);
            this.hide2();
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
    this.gridApi.forEachNodeAfterFilter(function (node:any) {
      items.push(node.data);
    });

    for (const i in items) {
     items[i].selectyn=this.showyn;
     this.gridApi.api.updateRowData({

      updateRowData: [ items[i]]
    });

    }
}
  UpdateRecord()
  {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1)
    {

      this.objServ.StransactionsH = selectedRows [0];
      this.UsingDiscount =this.objServ.StransactionsH.transactionStatusCode! <3?false:true;
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
      this.objServ.Delete(index).subscribe((data) =>
      {
        this.rowData = this.objServ.Delete(index);
        this.insert = false;
      });
    }

  }

  uploadFile() {  
   
    let formData = new FormData();  
    formData.append('upload', this.fileInput.nativeElement.files[0])  
    this.objServ.uploadFile(formData).subscribe(result => {  
      
    });  
   
  }
}

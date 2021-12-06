import { Component, OnInit , ViewChild, TemplateRef} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CurrencyMappingService } from 'src/app/_Service/Codes/currency-mapping.service';
import { CurrenciesService } from 'src/app/_Service/Codes/currencies.service';
@Component({
  selector: 'app-currency-mapping',
  templateUrl: './currency-mapping.component.html',
  styleUrls: ['./currency-mapping.component.scss']
})
export class CurrencyMappingComponent implements OnInit {
  rowData: any;
  Update: boolean;
  Data: any;
  public defaultColDef:any;
  private gridApi:any;
  isSubmitted :boolean |null=false;
  rowSelection = 'single';
  title: string;
  eInvoiceCurrencyList: any;
  modalRef: BsModalRef;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('template') template: TemplateRef<any>;
  public Rtl = localStorage.getItem('textDir') === 'ltr' ? false : true;
  columnDefs = [
    { headerName: this.Rtl ? 'unit Code' : 'Serial', field: 'currencySerial', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'الاسم العربى' : 'ERP Currency Code', field: 'erpCurrencyCode', width: 250, sortable: true, filter: true },
    { headerName: this.Rtl ? 'الاسم الانجليزى' : 'e-Invoice Currency Code', field: 'eInvoiceCurrencyCode', width: 250, sortable: true, filter: true }
  ];
  constructor(
    public _CurrencyMapping: CurrencyMappingService,
    // private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private modalService: BsModalService,
    public _Currencies: CurrenciesService) {
    this.defaultColDef = { resizable: true };
    this._Currencies.GetAlldata().subscribe(res =>
      {
this.eInvoiceCurrencyList = res;

      }
    );

  }

  ngOnInit(): void {
    this.reset();
    this.rowData = this._CurrencyMapping.Getdata();
    // console.log(this.rowData);
  }
  onChangeSelection(select:any) {
    this._CurrencyMapping.SICurrencyMapping .eInvoiceCurrencyCode = select;

  }
  onrowDoubleClicked(params:any) {

    this.UpdateRecord(this.template);
    this.Update = true;


  }
  reset() {
    this._CurrencyMapping.SICurrencyMapping =
    {
      erpCurrencyCode: '',
      currencySerial: 0,
      eInvoiceCurrencyCode: '',

    };
    this.gridApi?.deselectAll();

  }
  onGridReady(params:any) {
    this.gridApi = params.api;
    this.rowData = this._CurrencyMapping.Getdata();

  }
  Addnewrecord(template: TemplateRef<any>) {
    // console.log(this.rowData);
    this.reset();
    this.title = 'Add';
    this.modalRef = this.modalService.show(template);
    this.Update = false;
  }
  UpdateRecord(template: TemplateRef<any>) {
    const selectedRows = this.gridApi.getSelectedRows();
    this.Update = true;
    if (selectedRows != null && selectedRows.length === 1) {
      this. _CurrencyMapping.SICurrencyMapping.eInvoiceCurrencyCode = selectedRows[0].eInvoiceCurrencyCode;
      this._CurrencyMapping.SICurrencyMapping = selectedRows[0];
      
      this.title = 'Edit';
      this.modalRef = this.modalService.show(template);
    }
    else {
      alert('Must select Record to edit');
    }
  }
  onSelectionChanged(params:any) {

    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1) {
      this._CurrencyMapping.SICurrencyMapping = selectedRows[0];
    }
  }
  hide() {
    this.modalRef.hide();
  }
  onSubmit(f: NgForm) {

    // this.spinner.show();
    this.isSubmitted = f.invalid;
    if (!this.isSubmitted) {

      if (!this.Update) {
        console.log( this._CurrencyMapping.SICurrencyMapping );
        this._CurrencyMapping.postData().subscribe(res => {
          this.rowData = this._CurrencyMapping.Getdata();

          alert('welcome');
          this.hide();
          setTimeout(() => {
            // this.spinner.hide();
          }, 1000);

        }
          , err => {
            console.log(err);
            setTimeout(() => {

              // this.spinner.hide();
            }, 1000);
          });
      }
      else {

        this._CurrencyMapping.putData().subscribe(res => {
          this.rowData = this._CurrencyMapping.Getdata();
          this.hide();
          setTimeout(() => {
            // this.spinner.hide();
          }, 1000);
        }
          , err => {
            console.log(err);
            setTimeout(() => {
              // this.spinner.hide();
            }, 1000);
          });
      }
    }
    setTimeout(() => {

      // this.spinner.hide();
    }, 1000);

  }

  Delete(index: number) {
    if (confirm('Are You Sure ?')) {
      this._CurrencyMapping.Delete(index).subscribe((data:any) => {
        this.rowData = this._CurrencyMapping.Getdata();
        this.hide();
      });
    }

  }

}

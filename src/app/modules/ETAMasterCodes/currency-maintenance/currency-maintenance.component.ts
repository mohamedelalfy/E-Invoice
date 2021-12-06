import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
// import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CurrenciesService } from 'src/app/_Service/Codes/currencies.service';

@Component({
  selector: 'app-currency-maintenance',
  templateUrl: './currency-maintenance.component.html',
  styleUrls: ['./currency-maintenance.component.scss']
})
export class CurrencyMaintenanceComponent implements OnInit {

  rowData: any;
  mode=0;
  Data: any;
  public defaultColDef:any;
  private gridApi:any;
  isSubmitted:boolean | null=false;
  rowSelection = 'single';
  title: string;

  modalRef: BsModalRef;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('template') template: TemplateRef<any>;
  public Rtl = localStorage.getItem('textDir') === 'ltr' ? false : true;
  columnDefs = [
    {headerName: this.Rtl ? 'id' : 'ID', field: 'currencyCode',  width: 100 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'الاسم العربى' : 'Currency Arabic Name', field: 'currencyName',  width: 400 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'الاسم الانجليزى' : 'Currency English Name', field: 'currencyEngName',  width: 400 , sortable: true, filter: true}
  ];

  constructor(
      public objServ: CurrenciesService,
      // private spinner: NgxSpinnerService,
      // private translate: TranslateService,
      private modalService: BsModalService) { 
        this.defaultColDef = { resizable: true };
      }

  ngOnInit(): void {
    this.reset();

  }

  onrowDoubleClicked(params:any) {

    this.UpdateRecord(this.template);

   }
  reset()
  {
    this.objServ.SICurrencies =
    {
      currencyName: "",
      currencyEngName: "",
      currencyCode: '',

    };
    this.gridApi?. deselectAll();

  }
  onGridReady(params:any) {
    this.gridApi = params.api;
    this.rowData = this.objServ.Getdata();

  }
  Addnewrecord(template: TemplateRef<any>)
  {
    // console.log(this.rowData);
    this.reset();
    this.title = 'Add';
    this.mode=0;
    this.modalRef = this.modalService.show(template);
  }
  UpdateRecord(template: TemplateRef<any>)
  {
    this.mode=1;
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1)
    {
    this.objServ.SICurrencies = selectedRows [0];
    console.log( this.objServ.SICurrencies );
    this.title = 'Edit' ;
    this.modalRef = this.modalService.show(template);
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
    this.objServ.SICurrencies = selectedRows [0];
    }
  }
  hide()
  {
    this. modalRef.hide();
  }

  onSubmit(f: NgForm)
  {

    // this.spinner.show();
    this.isSubmitted = f.invalid;
    if (!this.isSubmitted)
    {

      if (this.mode===0)
      {

        this.objServ.postData().subscribe(res => {
          this.rowData = this.objServ.Getdata();
          this. hide();
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
      else
      {

        this.objServ.putData().subscribe(res => {
          this.rowData = this.objServ.Getdata();
          this. hide();
          setTimeout(() => {
          // this.spinner.hide();
          }, 1000);
        }
        , err => {
          console.log(err);
          setTimeout(() => {
            // this.spinner.hide();
          }, 1000);
        } );
      }
    }
    setTimeout(() => {

  // this.spinner.hide();
  }, 1000);

  }
  Delete(index: number)
  {
    if (confirm('Are You Sure ?'))
    {
      this.objServ.Delete(index).subscribe((data) =>
      {
        this.rowData = this.objServ.Getdata();
        this.hide();
      });
    }

  }
}

import { Component, OnInit, TemplateRef, ViewChild  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TaxService } from 'src/app/_Service/Codes/tax.service';

@Component({
  selector: 'app-tax-codes',
  templateUrl: './tax-codes.component.html',
  styleUrls: ['./tax-codes.component.scss']
})
export class TaxCodesComponent implements OnInit {

  rowData: any;
  Update: boolean;
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
    { headerName: this.Rtl ? 'tax Code' : 'Tax Code', field: 'taxCode', width: 120, sortable: true, filter: true },
    { headerName: this.Rtl ? 'الاسم العربى' : 'Tax Arabic Name', field: 'taxName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'الاسم الانجليزى' : 'Tax English Name', field: 'taxEngName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'Taxable' : 'Taxable', field: 'taxableYN', width: 200, sortable: true, filter: true },
  ];

  constructor(
    public STaxServ: TaxService,
    // private spinner: NgxSpinnerService,
    // private translate: TranslateService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.reset();
    this.rowData = this.STaxServ.Getdata();
    // console.log(this.rowData);
  }

  onrowDoubleClicked(params:any) {

    this.UpdateRecord(this.template);
    this.Update = true;
  }
  reset() {
    this.STaxServ.SITax =
    {
      taxCode: "",
      taxName: "",
      taxEngName: "",
      taxableYN: false,

    };
    this.gridApi?.deselectAll();

  }
  onGridReady(params:any) {
    this.gridApi = params.api;
    this.rowData = this.STaxServ.Getdata();

  }
  Addnewrecord(template: TemplateRef<any>) {
    // console.log(this.rowData);
    this.Update = false
    this.reset();
    this.title = 'Add';
    this.modalRef = this.modalService.show(template);
  }
  UpdateRecord(template: TemplateRef<any>) {
    const selectedRows = this.gridApi.getSelectedRows();
    this.Update = true;
    if (selectedRows != null && selectedRows.length === 1) {
      this.STaxServ.SITax = selectedRows[0];
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
      this.STaxServ.SITax = selectedRows[0];
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

      
        this.STaxServ.postData().subscribe(res => {
          console.log(res);
          this.rowData = this.STaxServ.Getdata();
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

        console.log(this.STaxServ.SITax);
        this.STaxServ.putData().subscribe(res => {
          this.rowData = this.STaxServ.Getdata();
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
      this.STaxServ.Delete(index).subscribe((data:any) => {
        this.rowData = this.STaxServ.Getdata();
        this.hide();
      });
    }

  }
}

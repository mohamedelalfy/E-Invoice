import { Component, OnInit , TemplateRef, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TaxSubTypesService } from 'src/app/_Service/Codes/tax-sub-types.service';
import { TaxService } from 'src/app/_Service/Codes/tax.service';

@Component({
  selector: 'app-tax-subtypes',
  templateUrl: './tax-subtypes.component.html',
  styleUrls: ['./tax-subtypes.component.scss']
})
export class TaxSubtypesComponent implements OnInit {

  rowData: any;
  Update: boolean;
  Data: any;
  public defaultColDef:any;
  private gridApi:any;
  isSubmitted:boolean | null=false;
  rowSelection = 'single';
  title: string;
  TaxList: any;

  modalRef:BsModalRef;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('template') template: TemplateRef<any>;
  public Rtl = localStorage.getItem('textDir') === 'ltr' ? false : true;
  columnDefs = [
    { headerName: this.Rtl ? 'taxSubtype Code' : 'Tax Subtype Code', field: 'taxSubtypeCode', width: 170, sortable: true, filter: true },
    { headerName: this.Rtl ? 'الاسم العربى' : 'Tax SubType Arabic Name', field: 'taxSubtypeName', width: 250, sortable: true, filter: true },
    { headerName: this.Rtl ? 'الاسم الانجليزى' : 'Tax SubType English Name', field: 'taxSubtypeEngName',width: 300, sortable: true, filter: true },
    { headerName: this.Rtl ? 'Tax Code' : 'Tax Code', field: 'taxCode', width: 200, sortable: true, filter: true },
  ];

  constructor(
    public STaxSubTypesServ: TaxSubTypesService,
    // private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private modalService: BsModalService,
    public TaxServ: TaxService) 
    { 
      this.defaultColDef = { resizable: true}
    }

  ngOnInit(): void {
    this.reset();
    this.rowData = this.STaxSubTypesServ.Getdata();
    // console.log(this.rowData);
  }

  onrowDoubleClicked(params:any) {

    this.UpdateRecord(this.template);
    this.Update = true;


  }
  reset() {
    this.STaxSubTypesServ.ITaxSubTypes =
    {
      taxSubtypeCode: "",
      taxCode: "",
      taxSubtypeName: "",
      taxSubtypeEngName: "",

    };
    this.gridApi?.deselectAll();

  }
  onGridReady(params:any) {
    this.gridApi = params.api;
    this.rowData = this.STaxSubTypesServ.Getdata();

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
      this.STaxSubTypesServ.ITaxSubTypes = selectedRows[0];
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
      this.STaxSubTypesServ.ITaxSubTypes = selectedRows[0];
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

        console.log(this.STaxSubTypesServ.ITaxSubTypes);
        this.STaxSubTypesServ.postData().subscribe(res => {
          console.log(res);
          this.rowData = this.STaxSubTypesServ.Getdata();
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

        console.log(this.STaxSubTypesServ.ITaxSubTypes);
        this.STaxSubTypesServ.putData().subscribe(res => {
          this.rowData = this.STaxSubTypesServ.Getdata();
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
      this.STaxSubTypesServ.Delete(index).subscribe((data) => {
        this.rowData = this.STaxSubTypesServ.Getdata();
        this.hide();
      });
    }

  }

  onChangeSelectioncountryID(select:any) {
    this.STaxSubTypesServ.ITaxSubTypes.taxCode = select;
    console.log(this.STaxSubTypesServ.ITaxSubTypes.taxCode);
  }

}

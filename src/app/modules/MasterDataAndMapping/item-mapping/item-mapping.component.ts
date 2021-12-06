import { Component, OnInit , ViewChild, TemplateRef} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ItemMappingsService } from 'src/app/_Service/Codes/item-mappings.service';
import { ItemsService } from 'src/app/_Service/Codes/items.service';
@Component({
  selector: 'app-item-mapping',
  templateUrl: './item-mapping.component.html',
  styleUrls: ['./item-mapping.component.scss']
})
export class ItemMappingComponent implements OnInit {


  rowData: any;
  Update: boolean;
  Data: any;
  public defaultColDef:any;
  private gridApi:any;
  isSubmitted:boolean|null=false;
  rowSelection:boolean|null=false;
  title: string;
  eInvoiceCurrencyList: any;
  mode= 0;
  modalRef: BsModalRef;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('template') template: TemplateRef<any>;
  public Rtl = localStorage.getItem('textDir') === 'ltr' ? false : true;
  columnDefs = [
    { headerName: this.Rtl ? 'unit Code' : 'ERP Item Code', field: 'erpItemCode', width: 250, sortable: true, filter: true },
    { headerName: this.Rtl ? 'الاسم العربى' : 'ERP Item Arabic Name', field: 'erpItemEngName', width: 300, sortable: true, filter: true },
    { headerName: this.Rtl ? 'الاسم الانجليزى' : 'e-Invoice GPC Code', field: 'eInvoiceItemGPC', width: 300, sortable: true, filter: true }
  ];

  constructor(
    public objServ: ItemMappingsService,
    //  private spinner: NgxSpinnerService
    private translate: TranslateService,
    private modalService: BsModalService,
    public objcuur: ItemsService) {

    this.defaultColDef = { resizable: true };
    this.objcuur.GetAlldata().subscribe(res =>
      {
this.eInvoiceCurrencyList = res;

      }
    );

  }
  ngOnInit(): void {
    this.reset();

    // console.log(this.rowData);
  }
  onChangeSelection(select:any) {
    this.objServ.SIitemMapping .eInvoiceItemGPC = select;

  }
  onrowDoubleClicked(params:any) {

    this.UpdateRecord(this.template);
    this.Update = true;


  }
  reset() {
    this.mode = 0;
    this.objServ.SIitemMapping =
    {
      erpItemCode: '',
      eInvoiceItemGPC: '',
      erpItemEngName: '',
      erpItemName: '',
      erpItemUnitCode: '0'

    };
    this.gridApi?.deselectAll();

  }
  onGridReady(params:any) {
    this.gridApi = params.api;
    this.rowData = this.objServ.Getdata();

  }
  Addnewrecord(template: TemplateRef<any>) {
    // console.log(this.rowData);
    this.reset();
    this.mode = 1;
    this.title = 'Add';
    this.modalRef = this.modalService.show(template);
    this.Update = false;
  }
  UpdateRecord(template: TemplateRef<any>) {
    this.mode = 0;
    const selectedRows = this.gridApi.getSelectedRows();
    this.Update = true;
    if (selectedRows != null && selectedRows.length === 1) {

      this.objServ.SIitemMapping = selectedRows[0];
      console.log( this.objServ.SIitemMapping);
      this.title = 'Edit';
      this.modalRef = this.modalService.show(template);
    }
    else {
      alert('Must select Record to edit');
    }
  }
  onSelectionChanged(params:any) {
    const selectedRows = this.gridApi.getSelectedRows();
  }
  hide() {
    this.modalRef.hide();
  }
  onSubmit(f: NgForm) {

    // this.spinner.show();
    this.isSubmitted = f.invalid;
    if (!this.isSubmitted) {

      if (!this.Update) {
        console.log( this.objServ.SIitemMapping );
        this.objServ.postData().subscribe(res => {
          this.rowData = this.objServ.Getdata();
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

        this.objServ.putData().subscribe(res => {
          this.rowData = this.objServ.Getdata();
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
      this.objServ.Delete(index).subscribe((data:any) => {
        this.rowData = this.objServ.Getdata();
        this.hide();
      });
    }

  }
}

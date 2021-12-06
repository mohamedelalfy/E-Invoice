import { Component, OnInit, TemplateRef, ViewChild  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UnitService } from 'src/app/_Service/Codes/unit.service';

@Component({
  selector: 'app-unit-type',
  templateUrl: './unit-type.component.html',
  styleUrls: ['./unit-type.component.scss']
})
export class UnitTypeComponent implements OnInit {

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
    { headerName: this.Rtl ? 'unit Code' : 'Unit Code', field: 'unitCode', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'الاسم العربى' : 'Unit Arabic Name', field: 'unitName', width: 250, sortable: true, filter: true },
    { headerName: this.Rtl ? 'الاسم الانجليزى' : 'Unit English Name', field: 'unitEngName', width: 250, sortable: true, filter: true }
  ];

  constructor(
    public UnitServ: UnitService,
    private translate: TranslateService,
     private modalService: BsModalService) {
    this.defaultColDef = { resizable: true };

  }

  ngOnInit(): void {
    this.reset();
    this.rowData = this.UnitServ.Getdata();
    // console.log(this.rowData);
  }

  onrowDoubleClicked(params:any) {

    this.UpdateRecord(this.template);
    this.Update = true;


  }
  reset() {
    this.UnitServ.SIuints =
    {
      unitCode: "",
      unitName: "",
      unitEngName: "",

    };
    this.gridApi?.deselectAll();

  }
  onGridReady(params:any) {
    this.gridApi = params.api;
    this.rowData = this.UnitServ.Getdata();

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
      this.UnitServ.SIuints = selectedRows[0];
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
      this.UnitServ.SIuints = selectedRows[0];
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

        this.UnitServ.postData().subscribe(res => {
          this.rowData = this.UnitServ.Getdata();
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

        this.UnitServ.putData().subscribe(res => {
          this.rowData = this.UnitServ.Getdata();
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
      this.UnitServ.Delete(index).subscribe((data:any) => {
        this.rowData = this.UnitServ.Getdata();
        this.hide();
      });
    }

  }
}

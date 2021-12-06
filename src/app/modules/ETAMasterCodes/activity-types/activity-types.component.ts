
import { Component, OnInit , ViewChild, TemplateRef} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivitycodeService } from 'src/app/_Service/Codes/activitycode.service';

@Component({
  selector: 'app-activity-types',
  templateUrl: './activity-types.component.html',
  styleUrls: ['./activity-types.component.scss']
})
export class ActivityTypesComponent implements OnInit {
  rowData: any;
  Data: any;
  public defaultColDef:boolean | null=false;
  private gridApi:any;
  isSubmitted:boolean | null=false;
  rowSelection = 'single';
  title: string;
  
  modalRef: BsModalRef;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('template') template: TemplateRef<any>;
  public Rtl = localStorage.getItem('textDir') === 'ltr' ? false : true;
  columnDefs = [
    {headerName: this.Rtl ? 'id' : 'id', field: 'activityCode',  width: 100 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'الاسم العربى' : 'activity Name', field: 'activityName',  width: 350 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'الاسم الانجليزى' : 'activity English Name', field: 'activityEngName',  width: 350 , sortable: true, filter: true}
  ];

  constructor(
    public _Activitycode: ActivitycodeService,
    // private spinner: NgxSpinnerService,
   
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.reset();
  }

  onrowDoubleClicked(params:any) {

    this.UpdateRecord(this.template);

   }
  reset()
  {
    this._Activitycode.SIactivitycodes =
    {
      activityName: "",
      activityEngName: "",
      activityCode: '',

    };
    this.gridApi?. deselectAll();

  }
  onGridReady(params:any) {
    this.gridApi = params.api;
    this.rowData = this._Activitycode.Getdata();

  }
  Addnewrecord(template: TemplateRef<any>)
  {
    // console.log(this.rowData);
    this.reset();
    this.title = 'Add';
    this.modalRef = this.modalService.show(template);
  }
  UpdateRecord(template: TemplateRef<any>)
  {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1)
    {
    this._Activitycode.SIactivitycodes = selectedRows [0];
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
    this._Activitycode.SIactivitycodes = selectedRows [0];
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

      if (this._Activitycode.SIactivitycodes.activityCode == null || this._Activitycode.SIactivitycodes.activityCode === '')
      {

        this._Activitycode.postData().subscribe(res => {
          this.rowData = this._Activitycode.Getdata();
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

        this._Activitycode.putData().subscribe(res => {
          this.rowData = this._Activitycode.Getdata();
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
      this._Activitycode.Delete(index).subscribe((data) =>
      {
        this.rowData = this._Activitycode.Getdata();
        this.hide();
      });
    }

  }
}

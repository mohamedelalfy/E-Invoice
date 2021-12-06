import { Component, OnInit,ViewChild, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { GroupService } from 'src/app/_Service/Security/group.service';

@Component({
  selector: 'app-group-maintenance',
  templateUrl: './group-maintenance.component.html',
  styleUrls: ['./group-maintenance.component.scss']
})
export class GroupMaintenanceComponent implements OnInit {
  rowData: any;
  Data: any;
  public defaultColDef:any;
  private gridApi:any;
  isSubmitted :boolean | null=false ;
  rowSelection = 'single';
  title: string;
  
  modalRef: BsModalRef;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('template') template: TemplateRef<any>;
  public Rtl = localStorage.getItem('textDir') === 'ltr' ? false : true;
  columnDefs = [
    {headerName: this.Rtl ? 'id' : 'id', field: 'groupId',  width: 0 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'الاسم العربى' : 'Arabic Name', field: 'groupName',  width: 250 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'الاسم الانجليزى' : 'English  Name', field: 'groupLatName',  width: 250 , sortable: true, filter: true}
  ];
  constructor(
    private modalService: BsModalService,
    private GroupServ: GroupService,
  ) { this.defaultColDef = { resizable: true };}

  ngOnInit(): void {
    this.reset();
    this.rowData = this.GroupServ.Getdata();
  }

  onrowDoubleClicked(params:any) {

    this.UpdateRecord(this.template);
    

   }
  reset()
  {
    this.GroupServ.Sergroup =
    {
      groupName: "",
      groupLatName: "",
      groupId: 0,

    };
    this.gridApi?. deselectAll();

  }
  onGridReady(params:any) {
    this.gridApi = params.api;
    this.rowData = this.GroupServ.Getdata();

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
    this.GroupServ.Sergroup = selectedRows [0];
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
    this.GroupServ.Sergroup = selectedRows [0];
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

      if (this.GroupServ.Sergroup.groupId == null || this.GroupServ.Sergroup.groupId === 0)
      {

        this.GroupServ.postData().subscribe(res => {
        this.rowData = this.GroupServ.Getdata();
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

        this.GroupServ.putData().subscribe(res => {
          this.rowData = this.GroupServ.Getdata().subscribe();
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
      this.GroupServ.Delete(index).subscribe((data) =>
      {
        this.rowData = this.GroupServ.Getdata();
        this.hide();
      });
    }

  }
}

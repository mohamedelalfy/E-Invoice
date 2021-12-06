import { Component, OnInit,TemplateRef,ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
// import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';
import { NgForm } from '@angular/forms';

import { UsersService } from 'src/app/_Service/Security/users.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { GroupService } from 'src/app/_Service/Security/group.service';
// import { BrowserModule } from '@angular/platform-browser';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-user-maintenance',
  templateUrl: './user-maintenance.component.html',
  styleUrls: ['./user-maintenance.component.scss']
})
export class UserMaintenanceComponent implements OnInit {
  // private rowClassRules;

  rowData: any;
  groups: any;
  rowSelection = 'single';
  isSubmitted:boolean | null=false;
  public defaultColDef:any;
  private gridApi:any;
  title: string;
  modalRef: BsModalRef;
  public Rtl = localStorage.getItem('textDir') == 'ltr' ? false : true;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  columnDefs = [
    {headerName: this.Rtl ? 'id' : 'id', field: 'id',  width: 0 , sortable: true, filter: true},
   // tslint:disable-next-line: max-line-length
   { headerName: this.Rtl ? 'البريد الالكتروني' : 'Email', field: 'userName',  width: 250 , sortable: true, filter: true},
   { headerName: this.Rtl ? 'الاسم العربى' : 'User Name', field: 'name',  width: 250 , sortable: true, filter: true},
   { headerName: this.Rtl ? 'الاسم الانجليزى' : 'User English Name', field: 'nameLat',  width: 250 , sortable: true, filter: true},
   { headerName: this.Rtl ? 'التليفون' : 'mobile', field: 'mobile',  width: 150 , sortable: true, filter: true},
  ];
  reset()
  {
    this._UsersService.Seruser =
    {
      name: "",
      userName: '',
      mobile1: "",
      mobile: "",
      id: 0,
      address: "",
      nameLat: '',
      groupId : 0,
      password: ''

    };
    this.gridApi?. deselectAll();

  }
  constructor(

    public _UsersService: UsersService,
    public _GroupService: GroupService,
    private modalService: BsModalService,
    ) { 

      this.defaultColDef = { resizable: true };
      this._UsersService.Seruser =
      {
        name: "",
        userName: '',
        mobile1: "",
        mobile: "",
        id: 0,
        address: "",
        nameLat: '',
        groupId : 0,
        password: ''
  
      };
      this._GroupService.GetAlldata().subscribe(orders => {
        this.groups = orders;
      });
    }

  ngOnInit(): void {
    this.reset();
    this.rowData = this._UsersService.GetAlldata();
  }
  onChangeSelection(selected:any) {
    // tslint:disable-next-line: radix
    this. _UsersService.Seruser.groupId = parseInt( selected ) ;
 }
  UpdateRecord(template: TemplateRef<any>)
  {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1)
    {
    this._UsersService.Seruser = selectedRows [0];
    this.title = 'Edit';
    this.modalRef = this.modalService.show(template);
    }
    else
    {
      alert('Must select Record to edit');
    }
  }
  hide()
  {
    this. modalRef.hide();
  }

  // start form on submit
  onSubmit(f: NgForm)
  {
    
      //  this.spinner.show();
       this.isSubmitted = f.invalid;
       if (!this.isSubmitted)
    {
      if (this._UsersService.Seruser.id == null || this._UsersService.Seruser.id == 0)
        {
          if ( this._UsersService.Seruser.password == null || this._UsersService.Seruser.password === '') {
            setTimeout(() => {
              // this.spinner.hide();
            }, 1000);
            return;

          }
          this._UsersService.postdata().subscribe(res => {
  this.rowData = this._UsersService.GetAlldata();
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
  else{
  this._UsersService.putdata().subscribe(res => {
    this.rowData = this._UsersService.GetAlldata();
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
  onSelectionChanged(params:any) {

    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1)
    {
    this._UsersService.Seruser = selectedRows [0]
    }
  }
  onGridReady(params:any) {
    this.gridApi = params.api;
    this.rowData = this._UsersService.GetAlldata();
  }
  deleteSelectedRows() {
    const alertRow  = this.gridApi.getSelectedRows();
    this.agGrid.api.updateRowData({remove: [alertRow[0]]});
    this.reset();
  }
  Delete(index: string){
      if (confirm('Are you sure to delete')) {{
          this._UsersService. Delete(index).subscribe((data) =>{
            this.rowData = this._UsersService.GetAlldata();
            this.hide();
          });
        }
      }
  }
  Addnewrecord(template: TemplateRef<any>){
    this.reset();
    this.title = 'Add';
    this.modalRef = this.modalService.show(template);
  }
  
}

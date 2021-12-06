import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UsersService } from 'src/app/_Service/Security/users.service';
import { GroupService } from 'src/app/_Service/Security/group.service';

@Component({
  selector: 'app-group-permission',
  templateUrl: './group-permission.component.html',
  styleUrls: ['./group-permission.component.scss']
})
export class GroupPermissionComponent implements OnInit {

  rowData: any;
  groups: any;
  rowSelection = 'single';
  isSubmitted = false;
  public defaultColDef:any;
  public gridApi: { deselectAll: () => void; getSelectedRows: () => any; };
  title: string;
  modalRef: BsModalRef;
  // tslint:disable-next-line: triple-equals
  public Rtl = localStorage.getItem('textDir') == 'ltr' ? false : true;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  columnDefs = [
    {headerName: this.Rtl ? 'id' : 'id', field: 'id',  width: 0 , sortable: true, filter: true},
   // tslint:disable-next-line: max-line-length
   { headerName: this.Rtl ? 'البريد الالكتروني' : 'Email', field: 'userName',  width: 250 , sortable: true, filter: true},
   { headerName: this.Rtl ? 'الاسم العربى' : 'User Name', field: 'name',  width: 150 , sortable: true, filter: true},
   { headerName: this.Rtl ? 'الاسم الانجليزى' : 'User English Name', field: 'nameLat',  width: 150 , sortable: true, filter: true},
   { headerName: this.Rtl ? 'التليفون' : 'mobile', field: 'mobile',  width: 150 , sortable: true, filter: true},
  ];

  constructor(
    public obserUser: UsersService,
    public objGroupService: GroupService,
    private modalService: BsModalService,

  ) {
    this.defaultColDef = { resizable: true };
    this.objGroupService.GetAlldata().subscribe(orders => {
      this.groups = orders;
    });
   }


  onChangeSelection(selected:any) {
    // tslint:disable-next-line: radix
    this. obserUser.Seruser.groupId = parseInt( selected ) ;
 }
  ngOnInit( ): void {
    this.reset();
    this.rowData = this.obserUser.GetAlldata();
  }
  reset()
  {
    this.obserUser.Seruser =
    {
      name: "",
      userName: "",
      mobile1: "",
      mobile: "",
      id: 0,
      address: "",
      nameLat: "",
      groupId : 0,
      password: ''

    };
    this.gridApi?. deselectAll();

  }
  onSubmit(f: NgForm)
  {
      //  this.spinner.show();
       this.isSubmitted == f.invalid;
       if (!this.isSubmitted)
    {
      if (this.obserUser.Seruser.id == null || this.obserUser.Seruser.id == 0)
        {
          if ( this.obserUser.Seruser.password == null || this.obserUser.Seruser.password === '') {
            setTimeout(() => {
              // this.spinner.hide();
            }, 1000);
            return;

          }
          this.obserUser.postdata().subscribe(res => {
  this.rowData = this.obserUser.GetAlldata();
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
  this.obserUser.putdata().subscribe(res => {
    this.rowData = this.obserUser.GetAlldata();
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


Delete(index: string)
{
  if (confirm('Are you sure to delete')) {
    {
this.obserUser. Delete(index).subscribe((data) =>
{
  this.rowData = this.obserUser.GetAlldata();
  this.hide();
    }

);
}
  }
}
deleteSelectedRows() {
  const alertRow  = this.gridApi.getSelectedRows();
  this.agGrid.api.updateRowData({remove: [alertRow[0]]});
  this.reset();
}
onSelectionChanged(params:any) {
  const selectedRows = this.gridApi.getSelectedRows();
  if (selectedRows != null && selectedRows.length === 1)
  {
  this.obserUser.Seruser = selectedRows [0]
  }
}
onGridReady(params:any) {
  this.gridApi = params.api;
  this.rowData = this.obserUser.GetAlldata();
}

hide()
  {
    this. modalRef.hide();
  }
Addnewrecord(template: TemplateRef<any>){
  this.reset();
  this.title = 'Add';
  this.modalRef = this.modalService.show(template);
}
UpdateRecord(template: TemplateRef<any>)
{
  const selectedRows = this.gridApi.getSelectedRows();
  if (selectedRows != null && selectedRows.length === 1)
  {
  this.obserUser.Seruser = selectedRows [0];
  this.title = 'Edit';
  this.modalRef = this.modalService.show(template);
  }
  else
  {
    alert('Must select Record to edit');
  }
}

}



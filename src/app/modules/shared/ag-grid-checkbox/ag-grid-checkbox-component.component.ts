import { Component, OnInit } from '@angular/core';
import { IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-ag-grid-checkbox-component',
  templateUrl: './ag-grid-checkbox-component.component.html',
  styleUrls: ['./ag-grid-checkbox-component.component.scss']
})
export class AgGridCheckboxComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  afterGuiAttached(params?: IAfterGuiAttachedParams): void {
  }

  refresh(params: any): boolean {
    params.data.amount++;
    params.data.cbox = params.value
    console.log(params.value);
    params.api.refreshCells(params);
    return false;
  }
}

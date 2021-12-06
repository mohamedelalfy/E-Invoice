import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vacationapprove-ag-btn',
  templateUrl: './vacationapprove-ag-btn.component.html',
  styleUrls: ['./ag-grid-checkbox-component.component.scss']
})
export class VacationapproveAgBtnComponent implements OnInit {
  classValue:String;
  btnText:String;
  color:String;

  constructor() { 
  
  }

  ngOnInit(): void {
  } 
  refresh(params: any): boolean {
    throw new Error('Method not implemented.');
  }
  private params: any;
  agInit(params: any): void {
      this.params = params;
      this.btnClicked =params.clicked;
      this.classValue = params.classValue;
      this.btnText ="Download";
      this.color = params.color;    
    }

  btnClicked = ()=> {
    
  }
  btnClickedreject() {
    this.params.clicked();
  }
  btnClickedview() {
    this.params.clicked();
  }
}

import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TransactionsheaderService } from 'src/app/_Service/Transaction/transactionsheader.service';
import { getCSSVariableValue } from '../../../../../kt/_utils';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-mixed-widget11',
  templateUrl: './mixed-widget11.component.html',
})
export class MixedWidget11Component implements OnInit {
  
  single: any[];
  ChartData: any[];
  ToDate :  string;
  FromDate: string;
  view: any[] = [1495 , 400];
  xDate= new Date();
  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Daily';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'No.Ivoices';
  legendTitle: string = 'Invoices Kind';

  colorScheme = {
    domain: ['#0045ff', '#c7342c', '#04db0c']
  };


  constructor(
    public TrnsH : TransactionsheaderService ,
    public datePipe: DatePipe) {
/*     this.datePipe.transform(this.ToDate,"yyyy-MM-dd");
    this.datePipe.transform(this.FromDate,"yyyy-MM-dd"); */
   
    this.xDate.setDate( this.xDate.getDate() - 15);
    this.FromDate=this.xDate.toISOString().split('T')[0];
    this.ToDate=new Date().toISOString().split('T')[0];

     TrnsH.GetChartData(this.FromDate,this.ToDate).subscribe(res=>{
      

         console.log(res);
         this.ChartData=res ;
         console.log( this.ChartData);
        Object.assign(this, {this: this.ChartData});
    })

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  onSelect(event:any) {
    console.log(event);
  }
  handler(){
    this.TrnsH.GetChartData(this.FromDate,this.ToDate).subscribe(res=>{
      

      console.log(res);
      this.ChartData=res ;
      console.log( this.ChartData);
      Object.assign(this, {this: this.ChartData});
    })
  }

}

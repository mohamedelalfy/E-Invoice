import { Component, OnInit } from '@angular/core';
import { TransactionsheaderService } from 'src/app/_Service/Transaction/transactionsheader.service';


@Component({
  selector: 'app-chartmonthly',
  templateUrl: './chartmonthly.component.html',
  styleUrls: ['./chartmonthly.component.css']
})
export class ChartmonthlyComponent implements OnInit {

  ChartData: any[];

  view: any[] = [1200 , 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Monthly';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'No.Ivoices';
  legendTitle: string = 'Invoices Kind';
  YearFilter= (new Date()).getFullYear();

  colorScheme = {
    domain: ['#0045ff', '#c7342c', '#04db0c']
  };


  constructor(public TrnsH : TransactionsheaderService) {

     TrnsH.GetChartDataM(this.YearFilter).subscribe(res=>{
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
  onChange(value:string){
    this.YearFilter= parseInt(value);
    this.TrnsH.GetChartDataM(this.YearFilter).subscribe(res=>{
        console.log(res);

        this.ChartData=res ;
        console.log( this.ChartData);
      Object.assign(this, {this: this.ChartData});
    })
    
  }
}



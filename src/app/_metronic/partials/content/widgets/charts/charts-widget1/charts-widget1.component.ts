import { Component, OnInit } from '@angular/core';
import { TransactionsheaderService } from 'src/app/_Service/Transaction/transactionsheader.service';
import { getCSSVariableValue } from '../../../../../kt/_utils';

@Component({
  selector: 'app-charts-widget1',
  templateUrl: './charts-widget1.component.html',
})
export class ChartsWidget1Component implements OnInit {
  chartOptions: any = {};
  YearFilter= (new Date()).getFullYear();
  series: any[];

  constructor(
    public TrnsH : TransactionsheaderService
    ) {}

  ngOnInit(): void {
    this.chartOptions = getChartOptions(350);
  }
  onChange(value:string){
    this.YearFilter= parseInt(value);
    this.TrnsH.GetChartDataM(this.YearFilter).subscribe(res=>{
        console.log(res);

        this.series=res ;
        console.log( this.series);
      Object.assign(this, {this: this.series});
    })
    
  }
}

function getChartOptions(this: any, height:number) {
  const labelColor = getCSSVariableValue('--bs-gray-500');
  const borderColor = getCSSVariableValue('--bs-gray-200');
  const baseColor = getCSSVariableValue('--bs-primary');
  const secondaryColor = getCSSVariableValue('--bs-gray-300');
  
  return {
    series: [
   
       {
        data: [44, 55, 57, 56, 61, 58],
      },

    ],
    chart: {
      fontFamily: 'inherit',
      type: 'bar',
      height: height,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30%',
        borderRadius: 5,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
   
      categories:   this.series.map((x: { name: any; })=>x.name),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    fill: {
      opacity: 1,
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val: number) {
          return '$' + val + ' thousands';
        },
      },
    },
    colors: [baseColor, secondaryColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  };
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from '../errors/error404/error404.component';

import { TransactionMainComponent } from './transaction-main/transaction-main.component';
import { TransactionManagementComponent  } from './transaction-management/transaction-management.component';
import { TransactionsReportComponent } from './transactions-report/transactions-report.component';
import { AllRecentDocumentsComponent } from './all-recent-documents/all-recent-documents.component';
import { ChartmonthlyrComponent } from './chartmonthly/chartmonthlyr.component';





const routes: Routes = [
  {
    path: '',
    component: TransactionMainComponent,
    children: [
      {
        path: 'TransactionManagement',
        component: TransactionManagementComponent,
      },
    
      {
        path: 'TransactionsReport',
        component: TransactionsReportComponent,
      },
      {
        path: 'AllRecentDocuments',
        component: AllRecentDocumentsComponent,
      },
      {
        path: 'Chartmonthlyr',
        component: ChartmonthlyrComponent,
      },

      { path: '', redirectTo: '404', pathMatch: 'full' },
      { path: '**', redirectTo: '404', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule ,],
})
export class TransactionRouting {}
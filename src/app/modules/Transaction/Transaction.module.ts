import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { ModalModule } from 'ngx-bootstrap/modal';

import { TransactionRouting } from './Transaction.Routing';
import {TransactionMainComponent } from './transaction-main/transaction-main.component';

import { TransactionManagementComponent  } from './transaction-management/transaction-management.component';
import { TransactionsReportComponent } from './transactions-report/transactions-report.component';
import { AllRecentDocumentsComponent } from './all-recent-documents/all-recent-documents.component';
import { AgGridCheckboxComponent } from '../shared/ag-grid-checkbox/ag-grid-checkbox-component.component';
import { ChartmonthlyrComponent } from './chartmonthly/chartmonthlyr.component';




@NgModule({
  declarations: [
    TransactionManagementComponent,
    TransactionsReportComponent,
    AllRecentDocumentsComponent,
    AgGridCheckboxComponent,
    TransactionMainComponent,
    ChartmonthlyrComponent
  ],
  imports: [
    CommonModule,
    TransactionRouting,
    FormsModule,
    CommonModule,
    AgGridModule.withComponents([]),
    ModalModule.forRoot(),
    TranslateModule
  ],
  providers: [DatePipe ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TransactionModule { }

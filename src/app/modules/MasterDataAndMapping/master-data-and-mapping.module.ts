import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { ModalModule } from 'ngx-bootstrap/modal';

import { MasterDataAndMappingMainRouting} from './MasterDataAndMapping-Routing.module';
import { CompanyMaintenanceComponent } from './company-maintenance/company-maintenance.component';
import { CurrencyMappingComponent } from './currency-mapping/currency-mapping.component';
import { CustomerMaintenanceComponent } from './customer-maintenance/customer-maintenance.component';
import { ItemMappingComponent } from './item-mapping/item-mapping.component';
import { MasterDataAndMappingMainComponent } from './master-data-and-mapping-main/master-data-and-mapping-main.component';
import { UnitMappingComponent } from './unit-mapping/unit-mapping.component';

@NgModule({
  declarations: [
    MasterDataAndMappingMainComponent,
    CompanyMaintenanceComponent,
    CurrencyMappingComponent,
    CustomerMaintenanceComponent,
    ItemMappingComponent,
    UnitMappingComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    AgGridModule.withComponents([]),
    MasterDataAndMappingMainRouting,
    ModalModule.forRoot(),
    TranslateModule ]
})
export class MasterDataAndMappingModule { }

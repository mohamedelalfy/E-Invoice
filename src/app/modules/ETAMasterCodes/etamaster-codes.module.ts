import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerModule } from 'ngx-spinner';

import { EtamasterCodesRouting } from './etamaster-codes.Routing';
import { ETAMasterCodesMasterComponent} from './etamaster-codes-master/etamaster-codes-master.component';

import { ActivityTypesComponent  } from './activity-types/activity-types.component';
import { CountryCodesComponent  } from './country-codes/country-codes.component';
import { TaxCodesComponent } from './tax-codes/tax-codes.component';
import { TaxSubtypesComponent } from './tax-subtypes/tax-subtypes.component';
import { CurrencyMaintenanceComponent  } from './currency-maintenance/currency-maintenance.component';
import { UnitTypeComponent } from './unit-type/unit-type.component';
import { GovernoratesComponent} from './governorates/governorates.component';
import { RegionComponent } from './region/region.component';



@NgModule({
  declarations: [
    ETAMasterCodesMasterComponent,
    TaxSubtypesComponent,
    TaxCodesComponent,
    RegionComponent,
    ActivityTypesComponent,
    CountryCodesComponent,
    CurrencyMaintenanceComponent,
    UnitTypeComponent,
    GovernoratesComponent

  ],
  imports: [
    CommonModule,
    EtamasterCodesRouting,
    FormsModule,
    CommonModule,
    AgGridModule.withComponents([]),
    ModalModule.forRoot(),
    TranslateModule,
    NgxSpinnerModule
  ]
})
export class ETAMasterCodesModule { }

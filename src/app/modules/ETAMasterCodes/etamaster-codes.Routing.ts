import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from '../errors/error404/error404.component';
import { ActivityTypesComponent } from './activity-types/activity-types.component';
import { CountryCodesComponent } from './country-codes/country-codes.component';
import { CurrencyMaintenanceComponent } from './currency-maintenance/currency-maintenance.component';
import { ETAMasterCodesMasterComponent } from './etamaster-codes-master/etamaster-codes-master.component';
import { GovernoratesComponent } from './governorates/governorates.component';
import { RegionComponent } from './region/region.component';
import { TaxCodesComponent } from './tax-codes/tax-codes.component';
import { TaxSubtypesComponent } from './tax-subtypes/tax-subtypes.component';
import { UnitTypeComponent } from './unit-type/unit-type.component';
// import { GroupMaintenanceComponent } from './group-maintenance/group-maintenance.component';
// import { GroupPermissionComponent } from './group-permission/group-permission.component';
// import { SecurityoffComponent } from './securityoff/securityoff.component';
// import { UserMaintenanceComponent } from './user-maintenance/user-maintenance.component';


const routes: Routes = [
  {
    path: '',
    component: ETAMasterCodesMasterComponent,
    children: [
      {
        path: 'ETAMasterCodes',
        component: ETAMasterCodesMasterComponent,
      },
    
      {
        path: 'ActivityTypes',
        component: ActivityTypesComponent,
      },
      {
        path: 'CountryCodes',
        component: CountryCodesComponent,
      },
      {
        path: 'TaxCodes',
        component: TaxCodesComponent,
      },
      {
        path: 'TaxSubtypes',
        component: TaxSubtypesComponent,
      },
      {
        path: 'CurrencyMaintenance',
        component: CurrencyMaintenanceComponent,
      },
      {
        path: 'UnitType',
        component: UnitTypeComponent,
      },
      {
        path: 'Governorates',
        component: GovernoratesComponent,
      },
      {
        path: 'Region',
        component: RegionComponent,
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
export class EtamasterCodesRouting {}
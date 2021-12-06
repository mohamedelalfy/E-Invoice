import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from '../errors/error404/error404.component';
import { MasterDataAndMappingMainComponent } from './master-data-and-mapping-main/master-data-and-mapping-main.component';
import { CompanyMaintenanceComponent } from './company-maintenance/company-maintenance.component';
import { CurrencyMappingComponent } from './currency-mapping/currency-mapping.component';
import { CustomerMaintenanceComponent } from './customer-maintenance/customer-maintenance.component';
import { ItemMappingComponent } from './item-mapping/item-mapping.component';
import { UnitMappingComponent } from './unit-mapping/unit-mapping.component';


const routes: Routes = [
  {
    path: '',
    component: MasterDataAndMappingMainComponent,
    children: [
      {
        path: 'CompanyMaintenance',
        component: CompanyMaintenanceComponent,
      },
    
      {
        path: 'CurrencyMapping',
        component: CurrencyMappingComponent,
      },
      {
        path: 'CustomerMaintenance',
        component: CustomerMaintenanceComponent,
      },
      {
        path: 'ItemMapping',
        component: ItemMappingComponent,
      },
      {
        path: 'UnitMapping',
        component: UnitMappingComponent,
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
export class MasterDataAndMappingMainRouting {}
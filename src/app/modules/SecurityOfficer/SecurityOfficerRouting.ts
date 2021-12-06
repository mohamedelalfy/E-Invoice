import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from '../errors/error404/error404.component';
import { SecurityoffComponent } from './securityoff/securityoff.component';
import { GroupMaintenanceComponent } from './group-maintenance/group-maintenance.component';
import { GroupPermissionComponent } from './group-permission/group-permission.component';
import { UserMaintenanceComponent } from './user-maintenance/user-maintenance.component';


const routes: Routes = [
  {
    path: '',
    component: SecurityoffComponent,
    children: [
      {
        path: 'UserMaintenance',
        component: UserMaintenanceComponent,
      },
    
      {
        path: 'GroupPermission',
        component: GroupPermissionComponent,
      },
      {
        path: 'GroupMaintenance',
        component: GroupMaintenanceComponent,
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
export class SecurityOfficerRouting {}
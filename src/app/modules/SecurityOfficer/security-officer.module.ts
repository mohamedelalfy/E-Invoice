import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { ModalModule } from 'ngx-bootstrap/modal';

import { TranslationModule } from '../../modules/i18n';
import { SecurityOfficerRouting } from './SecurityOfficerRouting';
import { SecurityoffComponent } from './securityoff/securityoff.component';
import { GroupMaintenanceComponent } from './group-maintenance/group-maintenance.component';
import { GroupPermissionComponent } from './group-permission/group-permission.component';
import { UserMaintenanceComponent } from './user-maintenance/user-maintenance.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    GroupPermissionComponent,
    UserMaintenanceComponent,
    GroupMaintenanceComponent,
    SecurityoffComponent,
 

  ],
  imports: [
    FormsModule,
    CommonModule,
    TranslationModule,
    AgGridModule.withComponents([]),
    SecurityOfficerRouting,
    ModalModule.forRoot(),
    TranslateModule
  ],
  exports: [RouterModule],
})
export class SecurityOfficerModule { }

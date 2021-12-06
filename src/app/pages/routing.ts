import { Routes } from '@angular/router';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'SecurityOfficer',
    loadChildren: () =>
      import('../modules/SecurityOfficer/security-officer.module').then((m) => m.SecurityOfficerModule),
  },
  {
    path: 'ETAMasterCodes',
    loadChildren: () =>
      import('../modules/ETAMasterCodes/etamaster-codes.module').then((m) => m.ETAMasterCodesModule),
  },
  {
    path: 'MasterDataAndMapping',
    loadChildren: () =>
      import('../modules/MasterDataAndMapping/master-data-and-mapping.module').then((m) => m.MasterDataAndMappingModule),
  },
  {
    path: 'Transaction',
    loadChildren: () =>
      import('../modules/Transaction/Transaction.module').then((m) => m.TransactionModule),
  },
  {
    path: 'builder',
    loadChildren: () =>
      import('./builder/builder.module').then((m) => m.BuilderModule),
  },
  {
    path: 'crafted/pages/profile',
    loadChildren: () =>
      import('../modules/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'crafted/account',
    loadChildren: () =>
      import('../modules/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'crafted/pages/wizards',
    loadChildren: () =>
      import('../modules/wizards/wizards.module').then((m) => m.WizardsModule),
  },
  {
    path: 'crafted/widgets',
    loadChildren: () =>
      import('../modules/widgets-examples/widgets-examples.module').then(
        (m) => m.WidgetsExamplesModule
      ),
  },
  {
    path: 'apps/chat',
    loadChildren: () =>
      import('../modules/apps/chat/chat.module').then((m) => m.ChatModule),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };

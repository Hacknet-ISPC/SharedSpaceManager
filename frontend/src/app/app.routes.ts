import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { DashboardAdmin } from './pages/dashboard-admin/dashboard-admin';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: '', component: DashboardAdmin }
    ]
  }
];
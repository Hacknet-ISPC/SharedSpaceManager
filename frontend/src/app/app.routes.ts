import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { DashboardAdmin } from './pages/dashboard-admin/dashboard-admin';
import { UserLayout } from './layouts/user-layout/user-layout';
import { DashboardInicio } from './pages/dashboard-user/dashboard-inicio/dashboard-inicio';
import { FormularioReserva } from './pages/dashboard-user/formulario-reserva/formulario-reserva';
import { MisReservas } from './pages/dashboard-user/mis-reservas/mis-reservas';
import { ConfirmacionReserva } from './pages/dashboard-user/confirmacion-reserva/confirmacion-reserva';
import { About } from './pages/about/about';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {
    path: 'admin',
    component: AdminLayout,
    children: [{ path: '', component: DashboardAdmin }],
  },
  {
    path: 'user',
    component: UserLayout,
    children: [
      { path: '', component: DashboardInicio },
      { path: 'formulario-reserva', component: FormularioReserva },
      { path: 'mis-reservas', component: MisReservas },
      { path: 'confirmacion-reserva', component: ConfirmacionReserva },
    ],
  },
];

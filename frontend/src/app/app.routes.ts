import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { loginGuard } from './core/guards/login-guard';
import { Dashboard } from './pages/dashboard/dashboard';
import { authGuard } from './core/guards/auth-guard';
import { Layout } from './core/components/layout/layout';
import { Rooms } from './pages/rooms/rooms';
import { AdminPage } from './pages/admin-page/admin-page';
import { adminGuard } from './core/guards/admin-guard';

export const routes: Routes = [
  { path: 'login', component: Login, canMatch: [loginGuard]},
  {
    path: '',
    component: Layout,
    canMatch: [authGuard],
    children: [
      { path: 'dashboard', component: Dashboard},
      { path: 'rooms', component: Rooms},
      { path: 'admin', component: AdminPage, canActivate: [adminGuard]},
      { path: '**', redirectTo: 'dashboard'},

    ]
  },
  { path: '**', redirectTo: 'login'}
];

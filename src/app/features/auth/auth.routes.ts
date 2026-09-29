import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../../layout/auth/auth-layout/auth-layout').then((m) => m.AuthLayout),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then((m) => m.Login),
      },
      { path: 'register', pathMatch: 'full', redirectTo: 'register/age' },
      {
        path: 'register/age',
        loadComponent: () => import('./pages/register/age/age').then((m) => m.RegisterAge),
      },
    ],
  },
];

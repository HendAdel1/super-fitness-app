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
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register-form/register-form').then((m) => m.RegisterForm),
      },
      {
        path: 'register/age',
        loadComponent: () => import('./pages/register/age/age').then((m) => m.RegisterAge),
      },
       {
        path: 'register/gender',
        loadComponent: () => import('./pages/register/gender/gender-selection/gender-selection').then((m) => m.GenderSelection),
      },
             {
        path: 'register/weight',
        loadComponent: () => import('./pages/register/weight/weight').then((m) => m.Weight),
      },
    ],
  },
];

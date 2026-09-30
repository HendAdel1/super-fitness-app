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
        path: 'forgot-password',
        loadComponent: () =>
          import('./pages/forgot-password/forgot-password').then((m) => m.ForgotPassword),
      },
      {
        path: 'verify-code',
        loadComponent: () =>
          import('./pages/verify-code/verify-code').then((m) => m.VerifyCode),
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./pages/reset-password/reset-password').then((m) => m.ResetPassword),
      },
    ],
  },
];

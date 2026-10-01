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
        path: 'register/height',
        loadComponent: () => import('./pages/register/height/height').then((m) => m.Height),
       {
        path: 'register/gender',
        loadComponent: () => import('./pages/register/gender/gender-selection/gender-selection').then((m) => m.GenderSelection),
      {
        path: 'register/goal',
        loadComponent: () =>
          import('./pages/register/onboarding-goal/onboarding-goal').then((m) => m.OnboardingGoal),
      },
      {
        path: 'register/activity-level',
        loadComponent: () =>
          import('./pages/register/onboarding-activity-level/onboarding-activity-level').then(
            (m) => m.OnboardingActivityLevel,
          ),
      },
    ],
  },
];

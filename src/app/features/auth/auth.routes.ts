import { Routes } from '@angular/router';
import { registrationStepGuard } from './guards/registration-step.guard';

export const authRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then((m) => m.Register),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'account' },
      {
        path: 'account',
        data: { step: 'account' },
        loadComponent: () => import('./pages/register/account/account').then((m) => m.RegisterAccount),
      },
      {
        path: 'profile',
        canActivate: [registrationStepGuard],
        data: { step: 'profile' },
        loadComponent: () => import('./pages/register/profile/profile').then((m) => m.RegisterProfile),
      },
      {
        path: 'goals',
        canActivate: [registrationStepGuard],
        data: { step: 'goals' },
        loadComponent: () => import('./pages/register/goals/goals').then((m) => m.RegisterGoals),
      },
    ],
  },
];

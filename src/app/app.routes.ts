import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { VisitorRequestService } from './services/visitor-request.service';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
    canActivate: [
      () => {
        const auth = inject(AuthService);
        const visitorRequests = inject(VisitorRequestService);
        const router = inject(Router);
        if (auth.isAuthenticated) {
          router.navigate(['/dashboard']);
          return false;
        }
        if (visitorRequests.isVisitorAuthenticated) {
          router.navigate(['/visitor-sign-in-out']);
          return false;
        }
        return true;
      },
    ],
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then((m) => m.DashboardPage),
    canActivate: [
      () => {
        const auth = inject(AuthService);
        const router = inject(Router);
        if (!auth.isAuthenticated) {
          router.navigate(['/login']);
          return false;
        }
        return true;
      },
    ],
  },
  {
    path: 'submit-request',
    loadComponent: () =>
      import('./pages/submit-request/submit-request.page').then((m) => m.SubmitRequestPage),
    canActivate: [
      () => {
        const auth = inject(AuthService);
        const router = inject(Router);
        if (!auth.isAuthenticated) {
          router.navigate(['/login']);
          return false;
        }
        return true;
      },
    ],
  },
  {
    path: 'submit-visitor-request',
    loadComponent: () =>
      import('./pages/submit-visitor-request/submit-visitor-request.page').then(
        (m) => m.SubmitVisitorRequestPage
      ),
    canActivate: [
      () => {
        const auth = inject(AuthService);
        const router = inject(Router);
        if (!auth.isAuthenticated) {
          router.navigate(['/login']);
          return false;
        }
        return true;
      },
    ],
  },
  {
    path: 'requests',
    loadComponent: () => import('./pages/requests/requests.page').then((m) => m.RequestsPage),
    canActivate: [
      () => {
        const auth = inject(AuthService);
        const router = inject(Router);
        if (!auth.isAuthenticated) {
          router.navigate(['/login']);
          return false;
        }
        return true;
      },
    ],
  },
  {
    path: 'sign-out-in',
    loadComponent: () =>
      import('./pages/sign-out-in/sign-out-in.page').then((m) => m.SignOutInPage),
    canActivate: [
      () => {
        const auth = inject(AuthService);
        const router = inject(Router);
        if (!auth.isAuthenticated) {
          router.navigate(['/login']);
          return false;
        }
        return true;
      },
    ],
  },
  {
    path: 'visitor-sign-in-out',
    loadComponent: () =>
      import('./pages/visitor-sign-in-out/visitor-sign-in-out.page').then(
        (m) => m.VisitorSignInOutPage
      ),
    canActivate: [
      () => {
        const visitorRequests = inject(VisitorRequestService);
        const router = inject(Router);
        if (!visitorRequests.isVisitorAuthenticated) {
          router.navigate(['/login']);
          return false;
        }
        return true;
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];

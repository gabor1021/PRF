import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { adminGuard } from './shared/guards/admin.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'signup', loadComponent: () => import('./signup/signup.component').then((c) => c.SignupComponent) },
    { path: 'login', loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent) },
    { path: 'profile', loadComponent: () => import('./profile/profile.component').then((c) => c.ProfileComponent), canActivate: [authGuard] },
    { path: 'reservation', loadComponent: () => import('./reservation/reservation.component').then((c) => c.ReservationComponent), canActivate: [authGuard] },
    { path: 'history', loadComponent: () => import('./history/history.component').then((c) => c.HistoryComponent), canActivate: [authGuard] },
    { path: 'user-management', loadComponent: () => import('./user-management/user-management.component').then((c) => c.UserManagementComponent), canActivate: [adminGuard] },
    { path: 'date-management', loadComponent: () => import('./date-management/date-management.component').then((c) => c.DateManagementComponent), canActivate: [adminGuard] },
    { path: 'pref-management', loadComponent: () => import('./pref-management/pref-management.component').then((c) => c.PrefManagementComponent), canActivate: [adminGuard] },
    { path: '**', redirectTo: 'login' }
];

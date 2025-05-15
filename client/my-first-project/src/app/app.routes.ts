import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'signup', loadComponent: () => import('./signup/signup.component').then((c) => c.SignupComponent) },
    { path: 'login', loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent) },
    { path: 'user-management', loadComponent: () => import('./user-management/user-management.component').then((c) => c.UserManagementComponent), canActivate: [authGuard] },
    { path: 'date-management', loadComponent: () => import('./date-management/date-management.component').then((c) => c.DateManagementComponent), canActivate: [authGuard] },
    { path: 'profile', loadComponent: () => import('./profile/profile.component').then((c) => c.ProfileComponent), canActivate: [authGuard] },
    { path: 'reservation', loadComponent: () => import('./reservation/reservation.component').then((c) => c.ReservationComponent), canActivate: [authGuard] },
    { path: '**', redirectTo: 'login' }
];

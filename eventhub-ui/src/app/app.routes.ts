// File: src/app/app.routes.ts

import { Routes } from '@angular/router';

// Components
import { HomeComponent } from './home/home';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { EventDetailsComponent } from './event-details/event-details';
import { BookingComponent } from './booking/booking';
import { ProfileComponent } from './profile/profile';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard'; // This will now work
import { AdminEventManagementComponent } from './admin/pages/admin-event-management/admin-event-management'; 
import { AdminEventFormComponent } from './admin/pages/admin-event-form/admin-event-form'; 
import { AdminUserManagementComponent } from './admin/pages/admin-user-management/admin-user-management'; // <-- IMPORT
import { AdminBookingManagementComponent } from './admin/pages/admin-booking-management/admin-booking-management'; // <-- IMPORT


// Guards
import { authGuard } from './auth-guard';
import { adminGuard } from './admin-guard';

export const routes: Routes = [
  // ... your other routes
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'events/:id', component: EventDetailsComponent },
  { path: 'book/:eventId', component: BookingComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },

  // Admin Route
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [ // <-- Use children for nested routes
      { path: '', component: AdminDashboardComponent }, // /admin
      { path: 'events', component: AdminEventManagementComponent },
      { path: 'events/new', component: AdminEventFormComponent },
      { path: 'events/edit/:id', component: AdminEventFormComponent },
      { path: 'users', component: AdminUserManagementComponent }, // <-- ADD THIS ROUTE
      { path: 'bookings', component: AdminBookingManagementComponent }
    ]
  }
];
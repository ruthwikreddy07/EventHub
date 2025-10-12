// File: src/app/admin.guard.ts

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service'; // Import our enhanced service

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Use our new helper methods to check for both login and admin role
  if (authService.isLoggedIn() && authService.isAdmin()) {
    // If logged in AND is an admin, allow access
    return true;
  } else {
    // If not logged in or not an admin, redirect to the home page
    console.log('Admin access denied. Redirecting to home.');
    router.navigate(['/']);
    return false;
  }
};
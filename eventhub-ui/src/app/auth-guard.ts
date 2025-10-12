// File: src/app/auth.guard.ts

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Check for the token in the browser's local storage
  const token = localStorage.getItem('token');

  if (token) {
    // If a token exists, the user is considered logged in. Allow access.
    return true;
  } else {
    // If no token, redirect the user to the login page.
    console.log('Access denied. Redirecting to login.');
    router.navigate(['/login']);
    // Deny access to the originally requested route.
    return false;
  }
};
// File: src/app/auth.interceptor.ts

import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Get the token from localStorage
  const token = localStorage.getItem('token');

  // If a token exists, clone the request and add the Authorization header
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    // Pass the cloned request to the next handler
    return next(clonedRequest);
  }

  // If no token, pass the original request along without modification
  return next(req);
};
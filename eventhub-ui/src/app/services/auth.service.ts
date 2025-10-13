// File: src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment'; // <-- 1. CRITICAL IMPORT

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`; // <-- 2. CRITICAL CHANGE

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    // This will now use the correct URL
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  private getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      try { return jwtDecode(token); } catch (error) { return null; }
    }
    return null;
  }

  isAdmin(): boolean {
    const decodedToken = this.getDecodedToken();
    return !!decodedToken && decodedToken.role === 'admin';
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs'; // Import BehaviorSubject and tap
import { Router } from '@angular/router'; // Import Router
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  
  // This is the "broadcast station" that tells other components if the user is logged in
  private currentUserSubject: BehaviorSubject<any | null>;
  public currentUser: Observable<any | null>;

  constructor(private http: HttpClient, private router: Router) {
    // When the service starts, check for a token and set the initial user status
    this.currentUserSubject = new BehaviorSubject<any | null>(this.getDecodedToken());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Helper to get the current user's data
  public get currentUserValue(): any | null {
    return this.currentUserSubject.value;
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // Update login(): it now saves the token AND broadcasts the new user status
  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, data).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.currentUserSubject.next(this.getDecodedToken()); // Broadcast the new user
        }
      })
    );
  }

  // Update logout(): it removes the token AND broadcasts that the user is logged out
  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null); // Broadcast that there is no user
    this.router.navigate(['/login']); // Navigate to login after logout
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // This now checks the live value from the broadcast
  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  // This also checks the live value
  isAdmin(): boolean {
    return !!this.currentUserValue && this.currentUserValue.role === 'admin';
  }

  private getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        // Check if token is expired
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          return null;
        }
        return decodedToken;
      } catch (error) {
        return null;
      }
    }
    return null;
  }
}

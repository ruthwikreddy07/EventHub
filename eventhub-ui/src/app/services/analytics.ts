// File: src/app/services/analytics.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private apiUrl = 'http://localhost:5000/api/analytics';

  constructor(private http: HttpClient) {}

  // Method to get the summary data from the backend
  getSummary(): Observable<any> {
    // The authInterceptor will automatically add the admin token
    return this.http.get(`${this.apiUrl}/summary`);
  }
}
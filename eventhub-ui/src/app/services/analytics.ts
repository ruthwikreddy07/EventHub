// File: src/app/services/analytics.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private apiUrl = 'http://localhost:5000/api'; // FIX IS HERE: added /api

  constructor(private http: HttpClient) {}

  // Method to get the summary data from the backend
  getSummary(): Observable<any> {
    // Correctly constructs: https://eventhub-api-jrti.onrender.com/api/summary
    return this.http.get(`${this.apiUrl}/summary`);
  }
}
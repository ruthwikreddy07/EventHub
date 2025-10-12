// File: src/app/services/event.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'https://eventhub-api-jrti.onrender.com/api/events';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getEvent(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // --- CREATE a new event (Admin only) ---
  addEvent(eventData: any): Observable<any> {
    return this.http.post(this.apiUrl, eventData);
  }

  // --- UPDATE an existing event (Admin only) ---
  updateEvent(id: string, eventData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, eventData);
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
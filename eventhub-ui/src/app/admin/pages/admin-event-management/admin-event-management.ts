// File: src/app/admin/pages/admin-event-management/admin-event-management.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventService } from '../../../services/event.service'; // Adjust path to service

@Component({
  selector: 'app-admin-event-management',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-event-management.html',
  styleUrls: ['./admin-event-management.scss']
})
export class AdminEventManagementComponent implements OnInit {
  events: any[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
    });
  }

  deleteEvent(eventId: string): void {
    // Ask for confirmation before deleting
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(eventId).subscribe({
        next: () => {
          console.log('Event deleted successfully');
          // Reload the events list to reflect the change
          this.loadEvents();
        },
        error: (err) => {
          console.error('Failed to delete event:', err);
          // Optionally show an error message to the admin
        }
      });
    }
  }
}
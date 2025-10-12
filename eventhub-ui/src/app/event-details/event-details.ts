// File: eventhub-ui/src/app/event-details/event-details.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router'; // Import ActivatedRoute to read URL
import { CommonModule } from '@angular/common';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './event-details.html',
  styleUrls: ['./event-details.scss']
})
export class EventDetailsComponent implements OnInit {
  event: any = null; // Property to hold the single event object

  constructor(
    private route: ActivatedRoute, // Inject ActivatedRoute
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    // Get the 'id' from the URL parameters
    const eventId = this.route.snapshot.paramMap.get('id');

    // Make sure we got an ID before making the API call
    if (eventId) {
      this.eventService.getEvent(eventId).subscribe({
        next: (data) => {
          this.event = data; // Store the fetched event data
        },
        error: (err) => {
          console.error('Failed to fetch event details:', err);
        }
      });
    }
  }
}
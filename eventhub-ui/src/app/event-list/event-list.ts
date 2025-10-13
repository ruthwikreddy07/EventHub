// File: src/app/event-list/event-list.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './event-list.html',
  styleUrls: ['./event-list.scss']
})
export class EventListComponent implements OnInit {
  allEvents: any[] = []; // Holds the original, full list of events
  filteredEvents: any[] = []; // Holds the list to be displayed after filtering
  isLoading = true;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(data => {
      this.allEvents = data;
      this.filteredEvents = data; // Initially, show all events
      this.isLoading = false;
    });
  }

  // This function is called every time the user types in the search bar
  filterEvents(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();

    if (!searchTerm) {
      this.filteredEvents = this.allEvents; // If search is empty, show all
    } else {
      // Filter the original list based on the search term
      this.filteredEvents = this.allEvents.filter(event => 
        event.title.toLowerCase().includes(searchTerm)
      );
    }
  }
}
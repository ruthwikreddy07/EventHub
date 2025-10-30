// File: src/app/home/home.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {
  // This will hold our 12 events for the grid
  featuredEvents: any[] = []; 
  isLoading = true;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    // We call the main getEvents() method
    this.eventService.getEvents().subscribe(allEvents => {
      // Then we take the first 12 items for our homepage grid
      this.featuredEvents = allEvents.slice(0, 8);
      this.isLoading = false;
    });
  }
}
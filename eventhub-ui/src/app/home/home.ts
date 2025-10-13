// File: src/app/home/home.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink], // We'll add HeroBannerComponent here soon
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {
  upcomingEvents: any[] = []; // Renamed for clarity
  isLoading = true;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    // Call the new service method
    this.eventService.getUpcomingEvents().subscribe(data => {
      this.upcomingEvents = data;
      this.isLoading = false;
    });
  }
}
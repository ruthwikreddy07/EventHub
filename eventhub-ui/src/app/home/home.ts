// File: eventhub-ui/src/app/home/home.ts

import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
// Make sure the "export" keyword is here
export class HomeComponent implements OnInit {

  events: any[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
        console.log('Events loaded:', this.events);
      },
      error: (err) => {
        console.error('Failed to load events:', err);
      }
    });
  }
}
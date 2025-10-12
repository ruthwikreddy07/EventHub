// File: src/app/profile/profile.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../services/booking.service'; // Our service to call the API

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class ProfileComponent implements OnInit {
  myBookings: any[] = []; // Array to hold the fetched bookings
  isLoading: boolean = true; // Flag to show a loading message

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    // When the component loads, call the service to get bookings
    this.bookingService.getMyBookings().subscribe({
      next: (data) => {
        this.myBookings = data;
        this.isLoading = false; // Data loaded, hide loading message
        console.log('My Bookings:', this.myBookings);
      },
      error: (err) => {
        console.error('Failed to fetch bookings:', err);
        this.isLoading = false; // Stop loading even if there's an error
      }
    });
  }
}
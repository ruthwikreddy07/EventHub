// File: src/app/profile/profile.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router'; // Import ActivatedRoute
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class ProfileComponent implements OnInit {
  myBookings: any[] = [];
  isLoading: boolean = true;

  // Inject ActivatedRoute to read URL parameters
  constructor(
    private bookingService: BookingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // 1. Check if the URL has ?payment_success=true
      if (params['payment_success'] === 'true') {
        const eventId = localStorage.getItem('pendingBookingEventId');
        if (eventId) {
          // 2. If it does, create the booking
          this.createBookingAfterPayment(eventId);
        } else {
          this.loadMyBookings();
        }
      } else {
        // 3. If not coming from a payment, just load existing bookings
        this.loadMyBookings();
      }
    });
  }

  createBookingAfterPayment(eventId: string): void {
    this.bookingService.createBooking({ eventId }).subscribe({
      next: () => {
        console.log('Booking created successfully after payment.');
        // IMPORTANT: Clean up storage so it's not used again on refresh
        localStorage.removeItem('pendingBookingEventId');
        // Now, fetch all bookings including the new one
        this.loadMyBookings();
      },
      error: (err) => {
        console.error('Failed to create booking after payment:', err);
        localStorage.removeItem('pendingBookingEventId'); // Also clean up on error
        this.loadMyBookings(); // Still try to load other bookings
      }
    });
  }

  loadMyBookings(): void {
    this.isLoading = true;
    this.bookingService.getMyBookings().subscribe({
      next: (data) => {
        this.myBookings = data;
        this.isLoading = false;
        console.log('My Bookings:', this.myBookings);
      },
      error: (err) => {
        console.error('Failed to fetch bookings:', err);
        this.isLoading = false;
      }
    });
  }
}
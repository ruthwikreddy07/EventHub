// File: src/app/admin/pages/admin-booking-management/admin-booking-management.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../services/booking.service';

@Component({
  selector: 'app-admin-booking-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-booking-management.html',
  styleUrls: ['./admin-booking-management.scss']
})
export class AdminBookingManagementComponent implements OnInit {
  bookings: any[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingService.getAllBookings().subscribe((data: any) => {
      this.bookings = data;
    });
  }
}
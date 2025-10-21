// File: src/app/booking/booking.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventService } from '../services/event.service';
import { PaymentService } from '../services/payment'; // <-- CORRECTED PATH to payment.ts

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking.html',
  styleUrls: ['./booking.scss']
})
export class BookingComponent implements OnInit {
  event: any = null;
  error: string | null = null;
  eventId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    if (this.eventId) {
      this.eventService.getEvent(this.eventId).subscribe(data => this.event = data);
    }
  }

  proceedToPayment(): void {
    if (!this.eventId) return;
    localStorage.setItem('pendingBookingEventId', this.eventId);

    this.paymentService.createCheckoutSession(this.eventId).subscribe({
      // Add explicit 'any' type to fix TS7006 error
      next: (session: any) => {
        this.paymentService.redirectToCheckout(session.id);
      },
      // Add explicit 'any' type to fix TS7006 error
      error: (err: any) => {
        this.error = 'Failed to create payment session. Please try again.';
        console.error(err);
      }
    });
  }
}
// File: src/app/services/payment.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // <-- IMPORT

declare var Stripe: any;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/payments`; // <-- CORRECTED
  private stripe: any;
  private stripePublicKey = 'pk_test_51SHNejF5LTNnpeMGdojAtcXyA0SGT46z8YWaj92ZsKSTUaGj5EvKUpUW9vg0ZznJqsZgNiOCw2hjOaCpIY09hyby00bohqRpAn'; 

  constructor(private http: HttpClient) {
    this.stripe = Stripe(this.stripePublicKey);
  }

  createCheckoutSession(eventId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-checkout-session`, { eventId });
  }

  redirectToCheckout(sessionId: string) {
    this.stripe.redirectToCheckout({ sessionId: sessionId });
  }
}
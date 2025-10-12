// File: src/app/admin/pages/admin-event-form/admin-event-form.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-admin-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-event-form.html',
  styleUrls: ['./admin-event-form.scss']
})
export class AdminEventFormComponent implements OnInit {
  eventForm: FormGroup;
  isEditMode = false;
  eventId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Define the form structure and validation rules
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      seats: [0, [Validators.required, Validators.min(0)]],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    // Logic for editing will be added here later
  }

  onSubmit(): void {
    if (this.eventForm.invalid) {
      return; // Don't submit if the form is invalid
    }

    // For now, we only handle creating a new event
    this.eventService.addEvent(this.eventForm.value).subscribe({
      next: () => {
        console.log('Event created successfully');
        // Navigate back to the event management list after success
        this.router.navigate(['/admin/events']);
      },
      error: (err) => {
        console.error('Failed to create event:', err);
        // Optionally show an error message
      }
    });
  }
}
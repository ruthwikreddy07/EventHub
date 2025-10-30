// File: src/app/admin/pages/admin-event-form/admin-event-form.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router'; // Import RouterLink
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-admin-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink], // Add RouterLink
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
    private route: ActivatedRoute // Injected to read URL parameters
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      seats: [0, [Validators.required, Validators.min(0)]],
      imageUrl: [''],
      bannerImageUrl: ['']
    });
  }

  ngOnInit(): void {
    // --- THIS IS THE NEW LOGIC THAT MAKES THE FORM SMART ---
    // Check the URL for an 'id' parameter
    this.eventId = this.route.snapshot.paramMap.get('id');

    if (this.eventId) {
      this.isEditMode = true; // Set to edit mode
      // Fetch the event data from the backend
      this.eventService.getEvent(this.eventId).subscribe(eventData => {
        // Format the date correctly for the datetime-local input field
        // The API sends a full ISO string, but the input needs 'YYYY-MM-DDTHH:mm'
        const date = new Date(eventData.date);
        const formattedDate = date.toISOString().substring(0, 16);

        // Pre-fill the form with the fetched data
        this.eventForm.patchValue({ ...eventData, date: formattedDate });
      });
    }
  }

  onSubmit(): void {
    if (this.eventForm.invalid) {
      return;
    }

    // --- THIS LOGIC IS NOW SMARTER TO HANDLE BOTH CASES ---
    if (this.isEditMode && this.eventId) {
      // If in edit mode, call the update service method
      this.eventService.updateEvent(this.eventId, this.eventForm.value).subscribe({
        next: () => {
          console.log('Event updated successfully');
          this.router.navigate(['/admin/events']);
        },
        error: (err) => console.error('Failed to update event:', err)
      });
    } else {
      // If in create mode, call the add service method
      this.eventService.addEvent(this.eventForm.value).subscribe({
        next: () => {
          console.log('Event created successfully');
          this.router.navigate(['/admin/events']);
        },
        error: (err) => console.error('Failed to create event:', err)
      });
    }
  }
}
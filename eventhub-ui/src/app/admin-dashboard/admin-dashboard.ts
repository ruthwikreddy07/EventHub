// File: src/app/admin-dashboard/admin-dashboard.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AnalyticsService } from '../services/analytics'; // Import the new service

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.scss']
})
export class AdminDashboardComponent implements OnInit {
  summaryData: any = null; // Property to hold our analytics
  isLoading = true;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.analyticsService.getSummary().subscribe({
      next: (data) => {
        this.summaryData = data;
        this.isLoading = false;
        console.log('Analytics Summary:', data);
      },
      error: (err) => {
        console.error('Failed to load analytics summary:', err);
        this.isLoading = false;
      }
    });
  }
}
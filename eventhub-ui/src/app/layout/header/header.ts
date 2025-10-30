import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs'; // Import Subscription

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, MatToolbarModule, MatButtonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  isLoggedIn = false;
  isAdmin = false;
  private authSubscription!: Subscription;

  // Make authService private, we'll use the properties above
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Start listening to the auth service's broadcast
    this.authSubscription = this.authService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user;
      this.isAdmin = user?.role === 'admin';
    });
  }

  ngOnDestroy(): void {
    // Stop listening when the component is destroyed to prevent memory leaks
    this.authSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
    // The navigation is now handled inside the authService.logout() method
    // but keeping this as a fallback is fine.
    this.router.navigate(['/']); 
  }
}

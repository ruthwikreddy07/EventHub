// File: eventhub-ui/src/app/app.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header'; // <-- IMPORT the new component

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.html', // <-- CORRECTED from app.component.html
  styleUrls: ['./app.scss']
})
export class AppComponent {
  title = 'eventhub-ui';
}
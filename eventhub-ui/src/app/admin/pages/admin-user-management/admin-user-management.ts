// File: src/app/admin/pages/admin-user-management/admin-user-management.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user';

@Component({
  selector: 'app-admin-user-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-user-management.html',
  styleUrls: ['./admin-user-management.scss']
})
export class AdminUserManagementComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(data => this.users = data);
  }

  toggleRole(user: any): void {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    if (confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      this.userService.updateUserRole(user._id, newRole).subscribe(() => this.loadUsers());
    }
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      this.userService.deleteUser(userId).subscribe(() => this.loadUsers());
    }
  }
}
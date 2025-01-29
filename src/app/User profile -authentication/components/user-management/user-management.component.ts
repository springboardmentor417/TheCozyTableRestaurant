import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServicesService } from '../../services/services.service';
import { AdminWelcomeComponent } from "../admin-welcome/admin-welcome.component";

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, RouterModule, AdminWelcomeComponent],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  loading: boolean = true;
  viewUsers: boolean = false; // Tracks the visibility of the user list

  constructor(private service: ServicesService, private router: Router) {}

  ngOnInit(): void {
    // Load users only when the list is toggled
    if (this.viewUsers) {
      this.loadUsers();
    }
  }

  // Fetch all users from the server
  loadUsers(): void {
    this.loading = true;
    this.service.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.loading = false;
      },
    });
  }

  // Delete a specific user by ID
  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.service.deleteUser(userId).subscribe({
        next: () => {
          alert('User deleted successfully.');
          this.loadUsers(); // Reload the user list after deletion
        },
        error: (err) => {
          console.error('Error deleting user:', err);
        },
      });
    }
  }

  // Toggle the user list visibility
  toggleViewUsers(): void {
    this.viewUsers = !this.viewUsers;
    if (this.viewUsers) {
      this.loadUsers(); // Load users only when toggling to "View Users"
    }
  }
}

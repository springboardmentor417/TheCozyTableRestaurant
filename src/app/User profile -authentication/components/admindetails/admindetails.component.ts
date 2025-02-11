
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { AdminchartComponent } from '../../../feedback/components/adminchart/adminchart.component';


@Component({
  selector: 'app-admindetails',
  standalone: true,
  imports: [CommonModule, RouterModule, AdminchartComponent], // ✅ Add Import
  templateUrl: './admindetails.component.html',
  styleUrls: ['./admindetails.component.css'],
})
export class AdmindetailsComponent implements OnInit {

  adminName: string = 'Admin';
todayRevenue: number = 1200;
pendingOrders: number = 8;
upcomingReservations: number = 15;
totalCustomers: number = 250;

  users: any[] = [];
  loading: boolean = false;
  
  // Control which section is visible
  showDashboard: boolean = true;
  showUsers: boolean = false;
  showReservations: boolean = false;

  constructor(private service: ServicesService, private router: Router) {}

  ngOnInit(): void {
    // Automatically show Admin Welcome on login
    this.showDashboard = true;
  }

  showUserManagement(): void {
    this.showDashboard = false;
    this.showUsers = true;
    this.showReservations = false;
    this.loadUsers();
  }

  showReservationManagement(): void {
    this.showDashboard = false;
    this.showUsers = false;
    this.showReservations = true;
    this.router.navigate(['decline'])
    //this.router.navigate(['/admin/reservations/decline']);

  }

  showAdminDashboard(): void {
    this.showDashboard = true;
    this.showUsers = false;
    this.showReservations = false;
  }

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

    // Delete User
  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.service.deleteUser(userId).subscribe({
        next: () => {
          alert('User deleted successfully.');
          this.loadUsers(); // Reload users after deletion
        },
        error: (err) => {
          console.error('Error deleting user:', err);
        },
      });
    }
  }
  navigateTo(route: string): void {
    switch (route) {
    case 'decline-reservations': this.router.navigate(['/admindetails/reservations/decline']); break;
    }
   }
  }
  
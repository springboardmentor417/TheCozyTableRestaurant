import { Component } from '@angular/core';
import {  RouterModule, Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-admin-welcome',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-welcome.component.html',
  styleUrl: './admin-welcome.component.css'
})
export class AdminWelcomeComponent { 
  /**
   * Navigate to the specified route.
   * @param route - The route to navigate to.
   */
adminName: string = 'Admin';
todayRevenue: number = 1200;
pendingOrders: number = 8;
upcomingReservations: number = 15;
totalCustomers: number = 250;

constructor(private service: ServicesService, private router: Router) {}

navigateTo(route: string): void {
  switch (route) {
    case 'view-orders': this.router.navigate(['/admin/orders']); break;
    case 'update-orders': this.router.navigate(['/admin/orders/update']); break;
    case 'add-menu': this.router.navigate(['/add-menu-item']); break;
    case 'update-menu': this.router.navigate(['/add-menu-item']); break;
    case 'delete-menu': this.router.navigate(['/add-menu-item']); break;
    case 'approve-reservations': this.router.navigate(['/admin/reservations/approve']); break;
    case 'decline-reservations': this.router.navigate(['/admin/reservations/decline']); break;
    case 'view-users': this.router.navigate(['/admin/users']); break;
    case 'add-user': this.router.navigate(['/admin/users/add']); break;
    case 'update-user': this.router.navigate(['/admin/users/update']); break;
    case 'deleteUser': this.router.navigate(['deleteUser']); break;
    case 'read-feedback': this.router.navigate(['/admin/feedback/read']); break;
    case 'respond-feedback': this.router.navigate(['/admin/feedback/respond']); break;
    case 'daily-reports': this.router.navigate(['/admin/reports/daily']); break;
    case 'weekly-reports': this.router.navigate(['/admin/reports/weekly']); break;
    case 'monthly-reports': this.router.navigate(['/admin/reports/monthly']); break;
    case 'settings': this.router.navigate(['/admin/settings']); break;
    default: console.warn('Route not found:', route);
  }
}

logout() {
  this.service.clearLocalUser();
  this.router.navigate(['/login']);
}
}
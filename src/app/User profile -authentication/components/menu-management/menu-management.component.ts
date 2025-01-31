import { Component } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { Router, RouterModule } from '@angular/router';
import { AdminWelcomeComponent } from "../admin-welcome/admin-welcome.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-management',
  standalone: true,
  imports: [RouterModule, AdminWelcomeComponent, CommonModule],
  templateUrl: './menu-management.component.html',
  styleUrl: './menu-management.component.css'
})
export class MenuManagementComponent {
  constructor(private service: ServicesService, private router: Router) {}
  
  navigateTo(route: string): void {
    switch (route) {
      case 'view-orders': this.router.navigate(['/admin/orders']); break;
    case 'update-orders': this.router.navigate(['/admin/orders/update']); break;
    case 'add-menu': this.router.navigate(['/admindetails/add-menu-item']); break;
    case 'update-menu': this.router.navigate(['/add-menu-item']); break;
    case 'delete-menu': this.router.navigate(['/add-menu-item']); break;
    }
  }

  
}

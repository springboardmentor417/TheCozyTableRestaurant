import { Component  } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
   constructor(  private router: Router,private service:ServicesService) {}
 
  logout() {
    this.service.clearLocalUser();
    if (confirm('Are you sure you want to log out?')) {
    this.router.navigate(['/login']);
    }
  }
}

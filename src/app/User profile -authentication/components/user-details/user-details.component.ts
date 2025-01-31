import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  
  constructor(
    private router: Router,
    private service: ServicesService,
    @Inject(PLATFORM_ID) private platformId: Object  // Inject PLATFORM_ID
  ) {}

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');  // Remove specific item instead of clearing all
      this.service.logout();
      this.router.navigate(['/login']).then(() => {
        window.location.reload();  // Ensure navigation and state reset
      });
    }
  }
}

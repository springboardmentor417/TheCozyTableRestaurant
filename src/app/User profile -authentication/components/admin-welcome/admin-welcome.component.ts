import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-welcome',
  standalone: true,
  imports: [],
  templateUrl: './admin-welcome.component.html',
  styleUrl: './admin-welcome.component.css'
})
export class AdminWelcomeComponent {
  constructor(private router: Router) {}

  /**
   * Navigate to the specified route.
   * @param route - The route to navigate to.
   */
  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

  /**
   * Logout the admin and redirect to the login page.
   */
  logout(): void {
    if (confirm('Are you sure you want to log out?')) {
      this.router.navigate(['/login']);
    }
  }
}

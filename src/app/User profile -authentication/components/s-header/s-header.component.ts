import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-s-header',
  standalone: true,
    imports: [RouterModule, CommonModule],
  templateUrl: './s-header.component.html',
  styleUrl: './s-header.component.css'
})
export class SHeaderComponent {
  isLoggedIn: boolean | undefined;
  subscription: any;
constructor(
    private router: Router,
    private authService: ServicesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Check login status from localStorage
    const currentUser = localStorage.getItem('currentUser');
    this.isLoggedIn = !!currentUser; // Convert to boolean

    // Subscribe to authService to listen for login status changes
    this.subscription = this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Logout method to clear user session
  logout(): void {
    localStorage.removeItem('currentUser');
    this.authService.setLoginStatus(false); // Notify authService about logout
    this.router.navigate(['/login']); // Redirect to login
    this.cdr.detectChanges();
  }
}

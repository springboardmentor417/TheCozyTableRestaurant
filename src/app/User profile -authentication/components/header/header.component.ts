import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServicesService } from '../../services/services.service';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  host: { 'unique-host': 'header' },
  standalone: true,
  imports: [RouterModule, CommonModule, NgbCarouselModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false; // Tracks login status
  isCustomer = false; // Tracks if user is a customer
  isAdmin = false; // Tracks if user is an admin
  private subscription: Subscription = new Subscription();

  // Carousel images
  carouselImages: string[] = [
    'assets/TajLife2v.jpg',
    'assets/CozyTable2v.png',
    'assets/CozyDine2v.jpg',
  ];

  constructor(
    private router: Router,
    private authService: ServicesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Check login status from localStorage
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.isLoggedIn = true;
      this.isCustomer = user.role === 'customer'; // Check if the user is a customer
      this.isAdmin = user.role === 'admin'; // Check if the user is an admin
    }

    // Subscribe to authService to listen for login status changes
    this.subscription = this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        const user = JSON.parse(currentUser);
        this.isCustomer = user.role === 'customer';
        this.isAdmin = user.role === 'admin';
      }
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
    this.isCustomer = false;
    this.isAdmin = false;
    this.router.navigate(['/login']); // Redirect to login
    this.cdr.detectChanges();
  }
}

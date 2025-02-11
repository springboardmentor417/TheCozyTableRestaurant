import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServicesService } from '../../services/services.service';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../../../orders/services/cart.service';

@Component({
  selector: 'app-headerhome',
  host: { 'unique-host': 'headerHome' },
  standalone: true,
  imports: [RouterModule, CommonModule, NgbCarouselModule],
  templateUrl: './headerhome.component.html',
  styleUrls: ['./headerhome.component.css'],
})
export class HeaderhomeComponent implements OnInit, OnDestroy {
  isLoggedIn = false; // Tracks login status
  cartCount: number = 0;
  isAdmin: boolean = false;
  homeRoute = "/Home";
  private subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private authService: ServicesService,
    private cdr: ChangeDetectorRef,
    private cartService: CartService
  ) {}

  // ngOnInit(): void {
    // Check login status from localStorage
    // const currentUser = localStorage.getItem('currentUser');
    // this.isLoggedIn = !!currentUser;
     // Convert to boolean

    // Subscribe to authService to listen for login status changes
  //   this.subscription = this.authService.isLoggedIn$.subscribe((status) => {
  //     this.isLoggedIn = status;
  //     this.cdr.detectChanges();
  //   });
  // }
  // ngOnInit(): void {
  //   const currentUser = localStorage.getItem('currentUser');
  //   if (currentUser) {
  //     const user = JSON.parse(currentUser);
  //     this.isLoggedIn = true;
  //     this.isAdmin = user.role === 'admin'; 
      // Check if the user is an admin
    // }

    // Subscribe to login status changes
  //   this.subscription = this.authService.isLoggedIn$.subscribe((status) => {
  //     this.isLoggedIn = status;
  //     const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  //     this.isAdmin = user.role === 'admin';
  //   });
  // }

  // ngOnInit(): void {
  //   const currentUser = localStorage.getItem('currentUser');
    
  //   if (currentUser) {
  //     const user = JSON.parse(currentUser);
  //     this.isLoggedIn = true;
  //     this.isAdmin = user.role === 'admin';
  //     this.setHomeRoute();
  //   }

    // Subscribe to authentication changes
  //   this.subscription = this.authService.isLoggedIn$.subscribe((status) => {
  //     this.isLoggedIn = status;
  //     const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  //     this.isAdmin = user.role === 'admin';
  //     this.setHomeRoute();
  //   });
  // }

  // setHomeRoute(): void {
  //   this.homeRoute = this.isLoggedIn ? (this.isAdmin ? "/admindetails" : "/userDetails") : "/Home";
  // }


  ngOnInit(): void {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count; // Update cart count dynamically
    });
    const user = this.authService.getLocalUser();
    if (user) {
      this.isLoggedIn = true;
      this.isAdmin = user.role === 'admin';
      this.setHomeRoute();
    }

    // Listen for authentication status changes
    this.subscription = this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      const user = this.authService.getLocalUser();
      this.isAdmin = user?.role === 'admin';
      this.setHomeRoute();
    });
  }

  setHomeRoute(): void {
    if (!this.isLoggedIn) {
      this.homeRoute = '/home'; // If no one is logged in, go to home
    } else if (this.isAdmin) {
      this.homeRoute = '/admindetails'; // Admin goes to admin dashboard
    } else {
      this.homeRoute = '/userDetails'; // Regular user goes to user details
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }

  // Logout method to clear user session
  logout(): void {
    localStorage.removeItem('currentUser');
    this.authService.setLoginStatus(false); // Notify authService about logout
    this.router.navigate(['/login']); // Redirect to login
    this.cdr.detectChanges();
  }
}

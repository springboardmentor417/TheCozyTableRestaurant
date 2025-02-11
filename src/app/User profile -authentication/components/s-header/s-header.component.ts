import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../orders/services/cart.service';

@Component({
  selector: 'app-s-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './s-header.component.html',
  styleUrls: ['./s-header.component.css'],
})
export class SHeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  subscription: any;
  isScrolled = false;
  cartCount: number = 0;
  homeRoute = "/Home";

  constructor(private router: Router, private authService: ServicesService, private cartService: CartService) {}

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
  // @HostListener('window:scroll', [])
  // onScroll(): void {
  //   this.isScrolled = window.scrollY > 50;
  // }

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

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
  logout(): void {
    localStorage.removeItem('currentUser');
    this.authService.setLoginStatus(false);
    this.router.navigate(['/login']);
  }
}



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

  constructor(private cartService: CartService,private router: Router, private authService: ServicesService) {}

  ngOnInit(): void {
    
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count; // Update cart count dynamically
    });
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.isLoggedIn = true;
      this.isAdmin = user.role === 'admin'; // Check if the user is an admin
    }

    // Subscribe to login status changes
    this.subscription = this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
      this.isAdmin = user.role === 'admin';
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.authService.setLoginStatus(false);
    this.router.navigate(['/login']);
  }
}



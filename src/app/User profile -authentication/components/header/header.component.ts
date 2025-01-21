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

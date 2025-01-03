import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-user-welcome',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './user-welcome.component.html',
  styleUrls: ['./user-welcome.component.css'],
})
export class UserWelcomeComponent implements OnInit {
  reservations: any[] = [];
orders: any[] = [];
payments: any[] = [];
loyaltyPoints: number = 50; // Example value

  loading: boolean = true;
  username: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  notifications: string[] = [];
  reviews: { dish: string; rating: number; comment: string }[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.loading = true;

    setTimeout(() => {
      if (isPlatformBrowser(this.platformId)) {
        const userDetails = localStorage.getItem('currentUser');
        if (userDetails) {
          const user = JSON.parse(userDetails);
          this.username = user.username ;
          this.email = user.email ;
          this.phone = user.phone ;
          this.address = user.address ;
        }
      }

      this.notifications = [
        '🎉 Special discount on weekends!',
        '🍽️ Your reservation is confirmed for Friday!',
      ];

      this.reviews = [
        { dish: 'Pasta Alfredo', rating: 5, comment: 'Delicious and creamy!' },
        { dish: 'Grilled Chicken', rating: 4, comment: 'Well cooked and flavorful.' },
      ];

      this.loading = false;
    }, 1000);
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
    if (confirm('Are you sur;e you want to log out?')) {
      this.router.navigate(['/login'])
    }

  }
  
  addReview(): void {
    this.router.navigate(['/add-review']);
  }
}

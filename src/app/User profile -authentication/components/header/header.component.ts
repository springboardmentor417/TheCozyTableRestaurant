import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false; // Tracks login status

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Check login status from localStorage
    const currentUser = localStorage.getItem('currentUser');
    this.isLoggedIn = !!currentUser; // Convert to boolean
  }

  // Logout method to clear user session
  logout(): void {
    localStorage.removeItem('currentUser');
    this.isLoggedIn = false; // Update login status
    this.router.navigate(['/login']); // Redirect to login
  }
}

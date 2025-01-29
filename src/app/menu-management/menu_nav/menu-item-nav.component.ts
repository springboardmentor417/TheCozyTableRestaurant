import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule, MatNavList, MatListItem } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'menu',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    MatListItem,
    CommonModule,
    MatSidenavModule,
    MatNavList,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './menu-item-nav.component.html',
  styleUrls: ['./menu-item-nav.component.css'],
})
export class MenuItemNavComponent implements OnInit {
  isAdmin: boolean = false; // Flag to track admin status

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Navigate to the default route
    this.router.navigate(['menu/menu-category']);

    // Logic to determine if the user is an admin
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.isAdmin = user.role === 'admin'; // Set to true if the role is 'admin'
  }
}

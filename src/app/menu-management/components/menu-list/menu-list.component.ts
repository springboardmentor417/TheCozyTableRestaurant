import { Component, OnInit } from '@angular/core';  
import { MenuService } from '../../services/menu.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // Import FormsModule

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],  // Add FormsModule here
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  menuItems: any[] = [];  // Holds the menu items fetched from the service
  newMenuItem: string = ''; // For holding the new menu item name to be added
  errorMessage: string = ''; // Variable to hold error message if item exists

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getMenuItems().subscribe({
      next: (items) => {
        this.menuItems = items; // Set the fetched items to the menuItems array
      },
      error: (err) => {
        console.error('Error fetching menu items:', err);
        alert('Failed to load menu items.');
      }
    });
  }
}

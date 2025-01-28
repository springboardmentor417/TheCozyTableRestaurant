import { Component, OnInit } from '@angular/core';
import { MenuService, MenuItem } from '../services/menu.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-menu-category',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './menu-category.component.html',
  styleUrls: ['./menu-category.component.css'],
})
export class MenuCategoryComponent implements OnInit {
  menuItems: MenuItem[] = []; // Full list of menu items
  filteredMenuItems: MenuItem[] = []; // Filtered list displayed to users
  categories: string[] = ['Appetizers', 'Starters', 'Main Course', 'Desserts', 'Rice', 'Drinks', 'Bread']; // List of categories
  selectedCategory: string = ''; // Currently selected category
  searchKeyword: string = ''; // Current search input
  priceRange: number = 0; // Current price range filter
  maxPriceAllowed: number = 1200; // Maximum allowed price
  priceWarning: boolean = false; // Flag for price warning
  errorMessage: string = ''; // Error message to display

  cart: MenuItem[] = []; // List of items added to the cart
  isAdmin: boolean = false; // Flag to check if the user is an admin

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.fetchLatestItems(); // Fetch the latest menu items when the component initializes
    this.checkUserRole(); // Determine if the user is an admin
  }

  // Fetch all latest menu items from the server
  fetchLatestItems(): void {
    this.menuService.getAllItems().subscribe({
      next: (items) => {
        this.menuItems = items;
        this.filteredMenuItems = items; // Initialize with the full list
        this.errorMessage = '';
      },
      error: (err) => {
        this.handleError(err);
      },
    });
  }

  // Filter items based on category, price, and search keyword
  filterItems(): void {
    const items = this.menuItems.filter((item) => {
      const matchesCategory =
        this.selectedCategory === '' || item.category === this.selectedCategory;
      const matchesPrice =
        this.priceRange === 0 || item.price <= this.priceRange;
      const matchesSearch =
        this.searchKeyword === '' ||
        item.name.toLowerCase().includes(this.searchKeyword.toLowerCase());

      return matchesCategory && matchesPrice && matchesSearch;
    });

    this.filteredMenuItems = items;

    // Display specific warnings based on filters
    if (this.filteredMenuItems.length === 0) {
      if (this.selectedCategory && items.every(item => item.category !== this.selectedCategory)) {
        this.errorMessage = 'Item is not available in this category.';
      } else if (this.priceRange && items.every(item => item.price > this.priceRange)) {
        this.errorMessage = 'Item is not available in this price range.';
      } else if (this.searchKeyword && items.every(item => !item.name.toLowerCase().includes(this.searchKeyword.toLowerCase()))) {
        this.errorMessage = 'Menu is not available.';
      } else {
        this.errorMessage = 'No items are available.';
      }
    } else {
      this.errorMessage = '';
    }
  }

  // Handle category selection change
  onCategoryChange(): void {
    this.filterItems(); // Apply filters when category changes
  }

  // Handle price range changes
  onPriceChange(): void {
    if (this.priceRange > this.maxPriceAllowed) {
      this.priceWarning = true;
      this.errorMessage = `Price exceeds the maximum limit of ${this.maxPriceAllowed}.`;
    } else {
      this.priceWarning = false;
      this.errorMessage = '';
      this.filterItems(); // Apply filters when price changes
    }
  }

  // Handle search keyword change
  onSearchChange(): void {
    this.filterItems(); // Apply filters when the search keyword changes
  }

  // Add item to the cart
  addToCart(item: MenuItem): void {
    if (!this.isAdmin) {
      this.cart.push(item);
      console.log('Item added to cart:', item);
    } else {
      console.warn('Admins cannot add items to the cart.');
    }
  }

  // Check if the logged-in user is an admin
  private checkUserRole(): void {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.isAdmin = user.role === 'admin'; // Example logic for determining admin role
  }

  // Handle errors when fetching data from the server
  private handleError(err: any): void {
    this.menuItems = [];
    this.filteredMenuItems = [];
    this.errorMessage = err.error?.message || 'An error occurred while fetching the menu.';
  }
}

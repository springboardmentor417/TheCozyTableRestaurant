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
  categories: string[] = ['Appetizers','Starters','Main Course', 'Desserts','Rice', 'Drinks','Bread'];  // List of categories
  selectedCategory: string = ''; // Currently selected category
  searchKeyword: string = ''; // Current search input
  priceRange: number = 0; // Current price range filter
  maxPriceAllowed: number = 1200; // Maximum allowed price
  priceWarning: boolean = false; // Flag for price warning
  errorMessage: string = ''; // Error message to display

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.fetchLatestItems(); // Fetch the latest menu items when the component initializes
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
    this.filteredMenuItems = this.menuItems.filter((item) => {
      const matchesCategory =
        this.selectedCategory === '' || item.category === this.selectedCategory;
      const matchesPrice =
        this.priceRange === 0 || item.price <= this.priceRange;
      const matchesSearch =
        this.searchKeyword === '' ||
        item.name.toLowerCase().includes(this.searchKeyword.toLowerCase());

      return matchesCategory && matchesPrice && matchesSearch;
    });

    if (this.filteredMenuItems.length === 0) {
      this.errorMessage = 'No items are available in this category.';
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

  // Handle errors when fetching data from the server
  private handleError(err: any): void {
    this.menuItems = [];
    this.filteredMenuItems = [];
    this.errorMessage = err.error?.message || 'An error occurred while fetching the menu.';
  }
}

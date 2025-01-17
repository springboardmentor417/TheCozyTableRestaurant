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
  styleUrls: ['./menu-category.component.css']
})
export class MenuCategoryComponent implements OnInit {
  menuItems: MenuItem[] = [];
  filteredMenuItems: MenuItem[] = []; // To store filtered items for display
  categories: string[] = ['Desserts', 'Main Course', 'Beverages']; // Example categories
  selectedCategory: string = '';  
  errorMessage: string = '';

  // Price range (single input)
  priceRange: number = 0;
  maxPriceAllowed: number = 1200; // Set a maximum price allowed
  priceWarning: boolean = false;

  // Search keyword
  searchKeyword: string = '';

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.fetchItems();  // Initial fetch of menu items
  }

  // Fetch menu items based on category and price
  fetchItems(): void {
    // if (this.selectedCategory && this.priceRange > 0) {
    //   // Fetch items by category and price
    //   this.menuService.getItemsByCategoryAndPrice(this.selectedCategory, this.priceRange).subscribe({
    //     next: (items) => {
    //       this.menuItems = items;
    //       this.filteredMenuItems = items; // Initialize filtered items
    //       this.errorMessage = '';
    //     },
    //     error: (err) => {
    //       this.menuItems = [];
    //       this.errorMessage = err.error.message || 'An error occurred';
    //     }
    //   });
    // } else if (this.selectedCategory) {
    //   // Fetch items by category
    //   this.menuService.getItemsByCategory(this.selectedCategory).subscribe({
    //     next: (items) => {
    //       this.menuItems = items;
    //       this.filteredMenuItems = items; // Initialize filtered items
    //       this.errorMessage = '';
    //     },
    //     error: (err) => {
    //       this.menuItems = [];
    //       this.errorMessage = err.error.message || 'An error occurred';
    //     }
    //   });
    // } else {
      // Fetch all items if no category is selected
      this.menuService.getAllItems().subscribe({
        next: (items) => {
          this.menuItems = items;
          this.filteredMenuItems = items; // Initialize filtered items
          this.errorMessage = '';
        },
        error: (err) => {
          this.menuItems = [];
          this.errorMessage = err.error.message || 'An error occurred';
        }
      });
    //}
  }

  // Method to handle category change
  onCategoryChange(category: string): void {
    if (category) {
      this.filteredMenuItems = this.menuItems.filter(item => 
        item.category.toLowerCase().includes(category.toLowerCase())
      );
    } else {
      this.filteredMenuItems = this.menuItems; // Reset the filtered items
    }
    this.selectedCategory = category;
    

    //this.fetchItems();  // Fetch items based on new category
  }

 // Method to handle price range change
onPriceChange(): void {
  if (this.priceRange) {
    this.filteredMenuItems = this.menuItems.filter(item => item.price <= this.priceRange);
    this.priceWarning = this.priceRange > this.maxPriceAllowed; // Show warning if the price exceeds the max allowed
  } else {
    this.filteredMenuItems = this.menuItems; // Reset the filtered items
    this.priceWarning = false; // Hide warning if no price is selected
  }
}


  // Method to handle search keyword change
  onSearchChange(): void {
    if (this.searchKeyword) {
      this.filteredMenuItems = this.menuItems.filter(item => 
        item.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    } else {
      this.filteredMenuItems = this.menuItems; // Reset the filtered items
    }
  }
}

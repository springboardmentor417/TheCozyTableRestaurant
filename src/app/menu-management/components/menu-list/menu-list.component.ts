import { Component, OnInit } from '@angular/core';  
import { MenuService } from '../../services/menu.service';  
import { CommonModule } from '@angular/common';  
import { HttpClientModule } from '@angular/common/http';  
import { FormsModule } from '@angular/forms'; // Import FormsModule for two-way binding  

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule], // Import necessary modules
  templateUrl: './menu-list.component.html', // Corrected path to the template
  styleUrls: ['./menu-list.component.css'] // Corrected path to the stylesheet
})

export class MenuListComponent implements OnInit {
  menuItems: any[] = []; // Holds the menu items fetched from the service
  editMode: boolean[] = []; // Tracks edit mode for each menu item
  errorMessage: string = ''; // Variable to hold error messages
  categories: string[] = ['Appetizers','Starters','Main Course', 'Desserts','Rice', 'Drinks','Bread']; // Sample categories

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getMenuItems().subscribe({
      next: (items) => {
        this.menuItems = items;
        this.editMode = items.map(() => false); // Initialize editMode array
      },
      error: (err) => {
        console.error('Error fetching menu items:', err);
        alert('Failed to load menu items.');
      }
    });
  }

  // Toggle edit mode for a specific menu item
  toggleEdit(index: number): void {
    this.editMode[index] = !this.editMode[index];
  }

  saveMenuItem(index: number): void {
    const updatedItem = this.menuItems[index];
    const formData = new FormData();
  
    // Append form data with all properties
    formData.append('id', updatedItem.id); // Include ID
    formData.append('name', updatedItem.name);
    formData.append('description', updatedItem.description);
    formData.append('price', updatedItem.price.toString()); // Ensure price is a string
    formData.append('category', updatedItem.category);
    formData.append('availability', updatedItem.availability.toString());
  
    // Add image file or URL if it exists
    if (updatedItem.imageFile) {
      formData.append('imageUrl', updatedItem.imageFile);
    } else if (updatedItem.imageUrl) {
      formData.append('imageUrl', updatedItem.imageUrl);
    }
  
    // Call the update service
    this.menuService.updateMenuItem(formData).subscribe({
      next: (response) => {
        this.menuItems[index] = response; // Update item in the list
        this.editMode[index] = false; // Exit edit mode
      },
      error: (err) => {
        console.error('Error updating menu item:', err);
        alert('Failed to update the menu item.');
      },
    });
  }
  
    

  // Delete a menu item
  deleteMenuItem(id: number, index: number): void {
    if (confirm('Are you sure you want to delete this menu item?')) {
      this.menuService.deleteMenuItem(id).subscribe({
        next: () => {
          this.menuItems.splice(index, 1); // Remove item from the list on successful deletion
          alert('Menu item deleted successfully.');
        },
        error: (err) => {
          console.error('Error deleting menu item:', err);
          alert('Failed to delete menu item.');
        }
      });
    }
  }
}

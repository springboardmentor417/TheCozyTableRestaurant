import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MenuService } from '../../services/menu.service';
import { CommonModule } from '@angular/common';
import { MenuListComponent } from '../menu-list/menu-list.component';
@Component({
  selector: 'app-add-menu-item',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule,MenuListComponent],
  templateUrl: './add-menu-item.component.html',
  styleUrls: ['./add-menu-item.component.css']
})
export class AddMenuItemComponent {
  addMenuItemForm: FormGroup;
  imageUrlErrorMessage: string = ''; // Error message for duplicate Image URL
  nameErrorMessage: string = '';    // Error message for duplicate Name
  menuItems: any[] = [];            // List of current menu items

  constructor(private fb: FormBuilder, private menuService: MenuService) {
    this.addMenuItemForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]+$') // Allows alphabets and spaces only
      ]],
      description: ['', [Validators.required]],
      price: [
        '',
        [
          Validators.required,
          Validators.min(1.01),
          Validators.max(1199.99),
          Validators.pattern('^0*[1-9]\\d*(\\.\\d{1,2})?$') // Validates price format
        ]
      ],
      category: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]]
    });

    this.loadMenuItems(); // Fetch the existing menu items
  }

  // Fetch menu items from the backend
  loadMenuItems(): void {
    this.menuService.getMenuItems().subscribe({
      next: (items) => (this.menuItems = items),
      error: (err) => console.error('Error loading menu items', err)
    });
  }

  // Add new menu item
  addMenuItem(): void {
    const trimmedName = this.addMenuItemForm.get('name')?.value.trim();
    const imageUrl = this.addMenuItemForm.get('imageUrl')?.value.trim();

    // Reset error messages
    this.nameErrorMessage = '';
    this.imageUrlErrorMessage = '';

    if (!trimmedName || !imageUrl) {
      alert('Menu item name and image URL cannot be empty.');
      return;
    }

    // Check if the name already exists
    const nameExists = this.menuItems.some(
      (item) => item.name.toLowerCase() === trimmedName.toLowerCase()
    );
    if (nameExists) {
      this.nameErrorMessage = 'Item name already exists!';
      return;
    }

    // Check if the image URL already exists
    const imageUrlExists = this.menuItems.some((item) => item.imageUrl === imageUrl);
    if (imageUrlExists) {
      this.imageUrlErrorMessage = 'Image URL already exists!';
      return;
    }

    const newItem = {
      name: trimmedName,
      description: this.addMenuItemForm.get('description')?.value,
      price: this.addMenuItemForm.get('price')?.value,
      category: this.addMenuItemForm.get('category')?.value,
      imageUrl: imageUrl,
      availability: true // Add the 'availability' property
    };

    this.menuService.addMenuItem(newItem).subscribe({
      next: (addedItem) => {
        this.menuItems.push(addedItem);
        this.addMenuItemForm.reset();
        alert('Menu item added successfully!');
      },
      error: (err) => {
        console.error('Error adding menu item:', err);
        alert('Failed to add menu item.');
      }
    });
  }

  // Submit handler
  onSubmit() {
    if (this.addMenuItemForm.valid) {
      this.addMenuItem(); // Add item if form is valid
    } else {
      alert('Please fill all required fields correctly.');
    }
  }
}

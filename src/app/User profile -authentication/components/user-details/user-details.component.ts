
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { ServicesService } from '../../services/services.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, RouterModule,ReactiveFormsModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  updateForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  activeSection: string = 'dashboard'; // Default section is Dashboard

  loading: boolean = true;
  username: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  userId: string | null = null;

  reservations: any[] = [];
  orders: any[] = [];
  payments: any[] = [];
  loyaltyPoints: number = 50; // Example value
  notifications: string[] = [];
  reviews: { dish: string; rating: number; comment: string }[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private service: ServicesService,
    private fb: FormBuilder
  ) {
    this.updateForm = this.fb.group(
      {
        email: ['', [Validators.email]], // Email field with validation
        phone: [
          '',
          [
            Validators.pattern(/^[5-9][0-9]{9}$/), // Ensures phone number is exactly 10 digits
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(12),
            Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])/), // Must contain a special character and a number
          ],
        ],
        confirmPassword: ['', Validators.required],
        address: [''], // Optional address field
      },
      { validators: this.passwordMatchValidator }
    );
  
  }

  ngOnInit(): void {
    this.loadUserData();
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.userId = user.id; // Extract user ID
    }
  }
  
  loadUserData(): void {
    this.loading = true;  
    setTimeout(() => {
      if (isPlatformBrowser(this.platformId)) {
        const userDetails = localStorage.getItem('currentUser');
        if (userDetails) {
          try {
            const user = JSON.parse(userDetails); // ✅ Ensure it's a JSON string before parsing
            this.userId = user.id;
            this.username = user.username;
            this.email = user.email;
            this.phone = user.phone;
            this.address = user.address || 'Not Provided';
          } catch (error) {
            console.error("❌ Error parsing localStorage data:", error);
            localStorage.removeItem('currentUser'); // 🚀 Clear invalid data
          }
        }
      }
      // Mock Data for Dashboard
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

  addReview(): void {
    this.router.navigate(['/add-review']);
  }

  // Password Match Validator
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }  
  // Update User Details 
  onUpdate(): void {
    if (this.updateForm.valid && this.userId) {
      // Step 1: Fetch the existing user details from the server
      this.service.getUserById(this.userId).subscribe({
        next: (existingUser) => {
          // Step 2: Merge updated fields with the existing user data
          const updatedUser = {
            ...existingUser,
            email: this.updateForm.value.email || existingUser.email,
            phone: this.updateForm.value.phone || existingUser.phone,
            password: this.updateForm.value.password,
            address: this.updateForm.value.address || existingUser.address, // Address is optional
          };
  
          // Step 3: Send the updated user object to the server
          this.service.updateUser(updatedUser).subscribe({
            next: () => {
              this.successMessage = 'Your details have been updated successfully!';
              this.updateForm.reset();
              alert(this.successMessage); // Show confirmation alert
  
              // Step 4: Update local component properties to reflect the changes
              this.email = updatedUser.email;
              this.phone = updatedUser.phone;
              this.address = updatedUser.address || 'Not Provided'; // Set default if empty
  
            },
            error: (err) => {
              console.error('Error updating user:', err);
            },
          });
        },
        error: (err) => {
          console.error('Error fetching user details:', err);
        },
      });
    } else {
      alert('User not logged in or invalid form submission.');
    }
  }

  // Delete User Account
  onDelete(): void {
    const confirmDelete = confirm('Are you sure you want to delete your account?');

    if (confirmDelete && this.userId) {
      this.service.deleteUser(this.userId).subscribe({
        next: () => {
          this.successMessage = 'Your account has been deleted successfully!';
          alert(this.successMessage);
          this.errorMessage = null;
          localStorage.clear();
          this.router.navigate(['/login']); // Redirect to login after account deletion
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          this.errorMessage = 'Failed to delete account. Please try again.';
        },
      });
    }
  }

  // Change Sections
  showSection(section: string): void {
    this.activeSection = section;
  }
}

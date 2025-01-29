
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  updateForm: FormGroup;
  successMessage: string | null = null;
  userId: string | null = null;

  constructor(private fb: FormBuilder, private service: ServicesService) {
    this.updateForm = this.fb.group(
      {
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
    // Retrieve user ID from local storage during initialization
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.userId = user.id; // Extract user ID
    }
  }

  // Custom Validator: Ensure passwords match
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onUpdate(): void {
    if (this.updateForm.valid && this.userId) {
      // Step 1: Fetch the existing user details from the server
      this.service.getUserById(this.userId).subscribe({
        next: (existingUser) => {
          // Step 2: Merge updated fields with the existing user data
          const updatedUser = {
            ...existingUser, // Keep all existing fields
            password: this.updateForm.value.password,
            address: this.updateForm.value.address || existingUser.address, // Update address only if provided
          };

          // Step 3: Send the updated user object to the server
          this.service.updateUser(updatedUser).subscribe({
            next: () => {
              alert('Your details have been updated successfully!');
              this.updateForm.reset();
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
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServicesService } from '../../services/services.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  successMessage: string | null = null;
  otpSent = false; // Flag to track if OTP is sent

  constructor(private fb: FormBuilder, private service: ServicesService) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
          Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])/),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(6),
          Validators.maxLength(60),
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[5-9][0-9]{9}$/),
        ],
      ],
      address: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const newUser = {
        ...this.registerForm.value,
        role: 'customer',
      };

      // Fetch all users and validate against duplicates
      this.service.getUsers().subscribe({
        next: (users: any[]) => {
          const emailExists = users.some((user) => user.email === newUser.email);
          const phoneExists = users.some((user) => user.phone === newUser.phone);

          if (emailExists) {
            alert('This email is already registered. Please use a different email.');
          } else if (phoneExists) {
            alert('This phone number is already registered. Please use a different phone number.');
          } else {
            // Add user if validation passes
            this.service.addUser(newUser).subscribe({
              next: (response: any) => {
                this.successMessage = 'User registered successfully!';
                alert(this.successMessage);
                this.registerForm.reset();

                // Save user details to local storage
                const userDetails = {
                  id: response.id, // Assuming backend returns 'id'
                  username: response.username,
                  email: response.email,
                  phone: response.phone,
                  role: response.role,
                };
                localStorage.setItem('currentUser', JSON.stringify(userDetails));
              },
              error: (err: any) => {
                console.error('Error adding user:', err);
                alert('An error occurred while registering. Please try again later.');
              },
            });
          }
        },
        error: (err: any) => {
          console.error('Error fetching users:', err);
          alert('An error occurred while validating the data. Please try again later.');
        },
      });
    } else {
      console.warn('Form is invalid:', this.registerForm.value);
      alert('Please fill out the form correctly before submitting.');
    }
  }
}

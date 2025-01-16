import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  restaurantName: string = 'Welcome to Cozi Restaurant Management';
  isLoggedIn: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: ServicesService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
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
    });

    // Check login status
    const currentUser = localStorage.getItem('currentUser');
    this.isLoggedIn = !!currentUser;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.getUsers(username, password).subscribe(
        (users) => {
          const user = users.find(
            (u) => u.username === username && u.password === password
          );

          if (user) {
            console.log('Login successful:', user);

            // Save user details in localStorage
            const userDetails = {
              id: user.id,
              username: user.username,
              email: user.email,
              phone: user.phone,
              address: user.address,
              role: user.role || 'customer',
            };

            localStorage.setItem('currentUser', JSON.stringify(userDetails));
            this.isLoggedIn = true;

            // Navigate based on user role
            if (user.role === 'admin') {
              alert('Welcome Admin!');
              this.router.navigate(['/adminWelcome']);
            } else if (user.role === 'customer') {
              alert('Welcome Customer!');
              this.router.navigate(['/userDetails']);
            } else {
              console.error('User role is undefined');
              alert('User role is undefined. Please contact support.');
            }
          } else {
            console.error('Invalid credentials');
            alert('Invalid username or password.');
          }
        },
        (error) => {
          console.error('Error during login:', error);
          alert('An error occurred while logging in. Please try again later.');
        }
      );
    } else {
      alert('Please fill in the form correctly.');
    }
  }

  logout(): void {
    // Clear user details from localStorage
    localStorage.removeItem('currentUser');
    this.isLoggedIn = false;
    alert('You have been logged out successfully.');
    this.router.navigate(['/Home']);
  }
}

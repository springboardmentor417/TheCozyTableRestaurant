import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServicesService } from '../../services/services.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent { loginForm: FormGroup;
  errorMessage: string | null = null;
  restaurantName: string = 'Welcome to Cozi Restaurant Management';

  constructor(private fb: FormBuilder, private authService: ServicesService, private router: Router) {
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
      email:[],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password, email } = this.loginForm.value;
  
      this.authService.getUsers(username, password, email).subscribe(
        (users) => {
          const user = users.find(
            (u) => u.username === username && u.password === password &&  
            
            (u.email === email || !email) // Allow users without email to log in
  
          );
          if (user) {
            console.log('Login successful:', user);
  
            // Store user details in localStorage
            const userDetails = {
              id: user.id,
              username: user.username,
              email:user.email,
              role: user.role,
            };
            localStorage.setItem('currentUser', JSON.stringify(userDetails));
  
            // Navigate to the appropriate page based on the user's role
            if (user.role === 'admin') {
              alert('Welcome Admin!');
              this.router.navigate(['/adminWelcome']);
            } else if (user.role === 'customer') {
              alert('Welcome Customer!');
              this.router.navigate(['/userWelcome']);
            } else {
              console.error('User role is undefined');
            }
          } else {
            console.error('Invalid credentials');
            alert('Invalid username or password.');
          }
        },
        (error) => {
          console.error('Error during login:', error);
          alert('An error occurred while logging in.');
        }
      );
    } else {
      alert('Please fill in the form correctly.');
    }
  }
  
}

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
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
  
      this.authService.getUsers(username, password).subscribe(
        (users: any[]) => {
          const user = users.find(u => u.username === username && u.password === password); // Filter user here
          if (user) {
            if (user.role === 'admin') {
              alert('Welcome Admin!');
              this.router.navigate(['/adminWelcome']);
            } else if (user.role === 'customer') {
              alert('Welcome Customer!');
              this.router.navigate(['/userWelcome']);
            } else {
              this.errorMessage = 'User role is undefined';
            }
          } else {
            this.errorMessage = 'Invalid username or password';
          }
        },
        (error: any) => {
          console.error('Error during login:', error);
          this.errorMessage = 'An error occurred while logging in';
        }
      );
    } else {
      this.errorMessage = 'Please fill in the form correctly';
    }
  }
  
}

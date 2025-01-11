import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
import { ServicesService } from '../../services/services.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  successMessage: string | null = null;

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
          Validators.pattern(/^[1-9][0-9]{9}$/), // Phone number must be 10 digits
        ],
      ],
      address: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const newUser = { ...this.registerForm.value, role: 'customer' }; // Add role as customer
      this.service.addUser(newUser).subscribe({
        next: (response: any) => {
          console.log('User added:', response);
          this.successMessage = 'User registered successfully!';
          this.registerForm.reset();
  
          // Save user details in local storage
          const userDetails = {
            id: response.id,
            username: response.username,
            email: response.email,
            number: response.number,
            role: response.role,
          };
          localStorage.setItem('currentUser', JSON.stringify(userDetails));
        },
        error: (err: any) => {
          console.error('Error adding user:', err);
        },
      });
    }
  }
  
}

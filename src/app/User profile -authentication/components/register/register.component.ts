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
          Validators.pattern(/^[1-9][0-9]{9}$/),
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
      console.log('Submitting user:', newUser); // Debugging step
  
      this.service.addUser(newUser).subscribe({
        next: (response: any) => {
          console.log('User added successfully:', response);
          this.successMessage = 'User registered successfully!';
          alert(this.successMessage);
          this.registerForm.reset();
          // Save user details
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
          console.error('Error adding user:', err); // Debugging step
        },
      });
    } else {
      console.warn('Form is invalid:', this.registerForm.value);
    }
  }
  
}

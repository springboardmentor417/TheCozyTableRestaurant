import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {
  updateForm: FormGroup;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private service: ServicesService) {
    this.updateForm = this.fb.group({
      id: ['', Validators.required], // User ID is required
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
    });
  }

  onUpdate(): void {
    if (this.updateForm.valid) {
      const updatedUser = this.updateForm.value;

      // Call the service's updateUser method
      this.service.updateUser(updatedUser).subscribe({
        next: (response: any) => {
          console.log('User updated successfully:', response);
          this.successMessage = 'User updated successfully!';
          this.updateForm.reset(); // Reset the form after a successful update
        },
        error: (err: any) => {
          console.error('Error updating user:', err);
          this.successMessage = null;
        },
      });
    }
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {
  
  deleteForm: FormGroup;
  successMessage: string | null = null;
  
  constructor(private fb: FormBuilder, private service: ServicesService) {
    this.deleteForm = this.fb.group({
      id: ['', Validators.required], // User ID is required
      email: ['', [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(30)]],
      phone: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]{9}$/)]]
    });
  }

  onDelete(): void {
    if (this.deleteForm.valid) {
      const userId = this.deleteForm.value.id;  // Extract only the id from the form

      // Call the service's deleteUser method
      this.service.deleteUser(userId).subscribe({
        next: (response: any) => {
          console.log('User deleted successfully:', response);
          this.successMessage = 'User deleted successfully!';
          this.deleteForm.reset(); // Reset the form after a successful update
        },
        error: (err: any) => {
          console.error('Error deleting user:', err);
          this.successMessage = null;
        },
      });
    }
  }
}

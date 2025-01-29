import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css'],
})
export class DeleteUserComponent {
  deleteForm: FormGroup;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private service: ServicesService) {
    this.deleteForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
    });
  }

  onDelete(): void {
    if (this.deleteForm.valid) {
      const username = this.deleteForm.value.username; // Extract the username

      // Find the user by username and delete
      this.service.getUsersByUsername(username).subscribe({
        next: (user) => {
          if (user) {
            this.service.deleteUser(user.id).subscribe({
              next: () => {
                this.successMessage = `User "${username}" deleted successfully!`;
                this.deleteForm.reset(); // Reset the form
              },
              error: (err) => {
                console.error('Error deleting user:', err);
                this.successMessage = null;
              },
            });
          } else {
            alert(`User "${username}" not found.`);
          }
        },
        error: (err) => {
          console.error('Error fetching user:', err);
        },
      });
    }
  }
}

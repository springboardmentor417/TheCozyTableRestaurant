import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-update-pass',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-pass.component.html',
  styleUrl: './update-pass.component.css'
})
export class UpdatePassComponent {
  updatePasswordForm: FormGroup;
  userId: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private servicesService: ServicesService
  ) {
    this.updatePasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Retrieve the userId from the state that was passed during navigation
    this.userId = this.router.getCurrentNavigation()?.extras.state?.['userId'];
  }

  onSubmit() {
    const newPassword = this.updatePasswordForm.value.newPassword;

    // Get user from localStorage
    const currentUser = this.servicesService.getLocalUser();
    if (currentUser && currentUser.id === this.userId) {
      currentUser.password = newPassword; // Update the password in localStorage
      this.servicesService.updateUser(currentUser).subscribe(() => {
        alert('Password updated successfully!');
        this.router.navigate(['/login']);
      });
    } else {
      alert('User not found or incorrect user ID.');
    }
  }
}

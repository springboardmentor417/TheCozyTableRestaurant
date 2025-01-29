import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-forgot-pass',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-pass.component.html',
  styleUrl: './forgot-pass.component.css'
})
export class ForgotPassComponent {
  forgotPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private servicesService: ServicesService
  ) {
    this.forgotPasswordForm = this.fb.group({
      contact: ['', [Validators.required]] // Email or phone number field
    });
  }

  onSubmit() {
    const contactValue = this.forgotPasswordForm.value.contact;

    this.servicesService.getUsers().subscribe((users) => {
      const user = users.find(
        (user) => user.email === contactValue || user.phone === contactValue
      );

      if (user) {
        // If user is found, navigate to the update password page
        alert('User found! Proceed to update password.');
        this.servicesService.setLocalUser(user);  // Save user data to localStorage
        this.router.navigate(['/updatePass'], { state: { userId: user.id } });
      } else {
        alert('User not found with this email or phone number.');
      }
    });
  }
}

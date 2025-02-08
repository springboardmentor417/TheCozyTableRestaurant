
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-forgot-pass',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './forgot-pass.component.html',
    styleUrl: './forgot-pass.component.css'
  })
  export class ForgotPassComponent {

    forgotPasswordForm: FormGroup;
    updatePasswordForm: FormGroup;
    isUpdatingPassword = false;  // ✅ Declare the property
  
    constructor(
      private fb: FormBuilder,
      private router: Router,
      private servicesService: ServicesService
    ) {
      this.forgotPasswordForm = this.fb.group({
        contact: ['', [Validators.required]]
      });
  
      this.updatePasswordForm = this.fb.group({
        newPassword: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(12),
          Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])/),]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(12),
          Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])/),]]
      });
    }
  
    onForgotPasswordSubmit() {
      const contactValue = this.forgotPasswordForm.value.contact;
  
      this.servicesService.getUsers().subscribe((users) => {
        const user = users.find(
          (user) => user.email === contactValue || user.phone === contactValue
        );
  
        if (user) {
          alert('User found! Proceed to update password.');
          this.servicesService.setLocalUser(user);  
          this.isUpdatingPassword = true;  // ✅ Switch to Update Password UI
        } else {
          alert('User not found with this email or phone number.');
        }
      });
    }
  
    onUpdatePasswordSubmit() {
      const newPassword = this.updatePasswordForm.value.newPassword;
      const confirmPassword = this.updatePasswordForm.value.confirmPassword;
  
      if (newPassword !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
  
      const currentUser = this.servicesService.getLocalUser();
      if (currentUser) {
        currentUser.password = newPassword;
        this.servicesService.updateUser(currentUser).subscribe(() => {
          alert('Password updated successfully!');
          this.router.navigate(['/login']);
        });
      }
    }}


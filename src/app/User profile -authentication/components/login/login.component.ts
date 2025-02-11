import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  restaurantName: string = 'Welcome to Cozi Restaurant Management';
  isLoggedIn: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: ServicesService,
    private router: Router,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {
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

    // Check login status
    const currentUser = localStorage.getItem('currentUser');
    this.isLoggedIn = !!currentUser;
  }

  onSubmit(): void {
    const { username, password } = this.loginForm.value;
  
    this.authService.getUsers().subscribe({
      next: (users) => {
        const user = users.find((u: any) => u.username === username && u.password === password);
        if (user) {
          const userDetails = {
            id: user.id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role || 'customer',
          };
  
          localStorage.setItem('currentUser', JSON.stringify(userDetails));
          this.isLoggedIn = true;
  
          if (user.role === 'admin') this.router.navigate(['/admindetails']);
          else this.router.navigate(['/userDetails']);
          
          this.authService.setLoginStatus(true); // Notify login status
          this.cdr.detectChanges(); // Trigger change detection
        } else alert('Invalid username or password.');
      },
      error: (err) => console.error('Error fetching users:', err),
    });
  }
  
}

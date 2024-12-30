import { Component } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-welcome',
  standalone: true,
  imports: [],
  templateUrl: './user-welcome.component.html',
  styleUrl: './user-welcome.component.css'
})
export class UserWelcomeComponent {

  restaurantName: string = 'Welcome to Cozi Restaurant Management';
  
  constructor(private service:ServicesService, private router:Router){}
      Welcome:string="Welcome you had sucessfully Logged in";
      logout() {
        this.service.clearLocalUser(); // Clear local storage
        alert('User has been logged out successfully.');
        this.router.navigate(['/login']);
        } 
}



import { Component } from '@angular/core';

@Component({
  selector: 'app-user-welcome',
  standalone: true,
  imports: [],
  templateUrl: './user-welcome.component.html',
  styleUrl: './user-welcome.component.css'
})
export class UserWelcomeComponent {
  restaurantName: string = 'Welcome to Cozi Restaurant Management';
      Welcome:string="Welcome you had sucessfully Logged in";
      
}

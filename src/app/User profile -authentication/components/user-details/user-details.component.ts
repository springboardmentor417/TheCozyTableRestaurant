import { Component, Directive, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  restaurantName: string = 'Customer Details';
      currentUser:any

      constructor(private userService:ServicesService){

      }
      ngOnInit(): void {
        this.ExcessUser();
      }

      ExcessUser():void{
        this.currentUser=this.userService.getLocalUser();
        console.log('Current User',this.currentUser)
      }
}

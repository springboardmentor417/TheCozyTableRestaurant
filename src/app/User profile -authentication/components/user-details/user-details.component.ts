import { Component, Directive, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
 
}

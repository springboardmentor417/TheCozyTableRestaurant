import { Component } from '@angular/core';
import {  RouterModule, Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-admin-welcome',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-welcome.component.html',
  styleUrl: './admin-welcome.component.css'
})
export class AdminWelcomeComponent { 
  /**
   * Navigate to the specified route.
   * @param route - The route to navigate to.
   */
adminName: string = 'Admin';
todayRevenue: number = 1200;
pendingOrders: number = 8;
upcomingReservations: number = 15;
totalCustomers: number = 250;


}
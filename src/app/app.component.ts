import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { AdminComponent } from './feedback/components/admin/admin.component';

import { ReservationComponent } from "./reservations/components/reservation/reservation.component";



import { MenuListComponent } from './menu-management/components/menu-list/menu-list.component';

import { AddMenuItemComponent } from './menu-management/components/add-menu-item/add-menu-item.component';
@Component({
  selector: 'app-root',
  standalone: true,


  imports: [RouterOutlet, CommonModule, AdminComponent],

  imports: [ReservationComponent],


  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'menu-management';
}

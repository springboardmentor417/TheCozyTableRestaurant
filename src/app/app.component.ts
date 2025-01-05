import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AdminComponent } from './feedback/components/admin/admin.component';
import { ReservationComponent } from "./reservations/components/reservation/reservation.component";
import { MenuListComponent } from './menu-management/components/menu-list/menu-list.component';
import { AddMenuItemComponent } from './menu-management/components/add-menu-item/add-menu-item.component';
import { FooterComponent } from './User profile -authentication/components/footer/footer.component';
import { HeaderComponent } from './User profile -authentication/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [CommonModule, RouterOutlet, FooterComponent, HeaderComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-demo-app';
}

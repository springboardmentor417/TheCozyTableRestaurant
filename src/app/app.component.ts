import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MenuListComponent } from './menu-management/components/menu-list/menu-list.component';

import { AddMenuItemComponent } from './menu-management/components/add-menu-item/add-menu-item.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AddMenuItemComponent,MenuListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'menu-management';
}

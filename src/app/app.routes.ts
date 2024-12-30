import { Routes } from '@angular/router';

import { AddMenuItemComponent } from './menu-management/components/add-menu-item/add-menu-item.component';
export const routes: Routes = [
  // Route to Add Menu Item
  { path: 'add-menu-item', component: AddMenuItemComponent },

  // Wildcard route for handling undefined paths (optional)
  { path: '**', redirectTo: '' }
  
];

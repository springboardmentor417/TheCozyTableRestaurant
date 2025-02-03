import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterModule, // Add RouterModule if you are using routing
  ],
  templateUrl: './admin-nav.component.html',
  styleUrl: './admin-nav.component.css',
})

export class AdminNavComponent {

}

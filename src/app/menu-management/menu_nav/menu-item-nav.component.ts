import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router,RouterOutlet } from '@angular/router';
import {MatButtonModule,} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MatNavList } from '@angular/material/list';
import { MatListItem } from '@angular/material/list';
import { RouterModule } from '@angular/router';

import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'menu',
  standalone: true,
  imports: [RouterModule, RouterOutlet,CommonModule,MatListItem,MatSidenavModule,MatNavList,MatIconModule,
    MatDividerModule,],
  templateUrl: './menu-item-nav.component.html',
  styleUrl: './menu-item-nav.component.css'
})
export class MenuItemNavComponent {
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.navigate(['menu/menu-category']);
}

}

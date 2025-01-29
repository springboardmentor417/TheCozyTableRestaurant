import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderhomeComponent } from "./User profile -authentication/components/headerhome/headerhome.component";
import { SHeaderComponent } from "./User profile -authentication/components/s-header/s-header.component";
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, SHeaderComponent, RouterOutlet, HeaderhomeComponent]
})
export class AppComponent {
 

  showMainHeader: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    // Listen for route changes and update the header accordingly
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const mainRoutes = ['/', '/aboutus'];
        this.showMainHeader = mainRoutes.includes(this.router.url);
      });
  }
}

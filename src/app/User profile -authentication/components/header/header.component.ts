import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}





















// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { ServicesService } from '../../services/services.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-header',
//   standalone: true,
//   imports: [CommonModule], // Ensure CommonModule is imported
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css'],
// })
// export class HeaderComponent {
//   isLoggedIn: boolean = false;
//   username: string = '';

//   constructor(private authService: ServicesService, private router: Router) {}

//   ngOnInit() {
//     this.checkLoginStatus();
//   }

//   checkLoginStatus() {
//     const user = this.authService.getLocalUser();
//     this.isLoggedIn = !!user; // Check if user exists in localStorage
//     this.username = user?.username || '';
//   }

//   logout() {
//     this.authService.clearLocalUser();
//     this.isLoggedIn = false;
//     this.username = '';
//     this.router.navigate(['/login']);
//   }
// }

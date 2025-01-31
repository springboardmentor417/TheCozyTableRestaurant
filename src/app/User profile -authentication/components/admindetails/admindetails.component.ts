import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ServicesService } from '../../services/services.service';


@Component({
  selector: 'app-admindetails',
  standalone: true,
  imports: [RouterModule, ],
  templateUrl: './admindetails.component.html',
  styleUrl: './admindetails.component.css'
})
export class AdmindetailsComponent {

  constructor(private service: ServicesService, private router: Router) {}

  logout() {
    if (confirm('Are you sure you want to log out?')) {
      this.service.logout();  // Clear local storage
      this.router.navigate(['/login']).then(() => {
        window.location.reload();  // Force a reload to clear any cached data
      });
    }

  }}

import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// const routes: Routes = [
//   // Define your routes here
//   { path: 'ack-page', component: AckPageComponent },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],

//   exports: [RouterModule],
// })

@Component({
  selector: 'app-ack-page',
  standalone: true,
  imports: [],
  templateUrl: './ack-page.component.html',
  styleUrl: './ack-page.component.css',
})
export class AckPageComponent {
  constructor(private router: Router) {}

  onViewReply() {
    this.router.navigate(['/reply']);
    console.log('hi');
  }
}

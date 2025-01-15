import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-redirect-page',
  standalone: true,
  imports: [],
  templateUrl: './redirect-page.component.html',
  styleUrl: './redirect-page.component.css',
})
export class RedirectPageComponent {
  constructor(private router: Router) {}

  onViewReply() {
    this.router.navigate(['/feedback']);
    console.log('hi');
  }
}

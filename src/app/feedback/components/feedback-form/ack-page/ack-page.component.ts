import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

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

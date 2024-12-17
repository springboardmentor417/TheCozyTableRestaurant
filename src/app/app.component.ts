import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, FormsModule],
})
export class AppComponent {
  userObj: USER = new USER();
  http = inject(HttpClient);
  users: USER[] = [];

  onSaveUser() {
    this.http
      .post<USER>('http://localhost:3000/users', this.userObj)
      .subscribe((res: USER) => {
        alert('thank you for you feedback');
        this.users.push(this.userObj);
        console.log(this.userObj);
      });
  }
}
export class USER {
  name: string;
  email: string;
  mobile: string;
  feedback: any;
  constructor() {
    this.name = '';
    this.email = '';
    this.mobile = '';
    this.feedback = '';
  }
}

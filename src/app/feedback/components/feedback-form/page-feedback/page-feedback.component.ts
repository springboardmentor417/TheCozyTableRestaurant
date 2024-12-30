import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-feedback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-feedback.component.html',
  styleUrls: ['./page-feedback.component.css'], // fixed typo
})
export class PageFeedbackComponent implements OnInit {
  http = inject(HttpClient); // or use constructor injection
  userList: feedback[] = [];

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.http
      .get<feedback[]>('http://localhost:3000/feedback')
      .subscribe((res) => {
        this.userList = res;
      });
  }
}

interface feedback {
  name: string;
  email: string;
  mobile: string;
  feedback: any;
  rating: number;
  foodQuality: number;
  valueForMoney: number;
  selectedDate: string;
  image: string | null;
  imageError: string;
}

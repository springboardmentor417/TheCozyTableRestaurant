import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StarRateingComponent } from '../app/star-rateing/star-rateing.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    StarRateingComponent,
    MatSlideToggleModule,
    MatSliderModule,
  ],
})
export class AppComponent {
  userObj: USER = new USER();
  http = inject(HttpClient);
  users: USER[] = [];
  userRating: number = 0;
  foodQuality: number = 0;
  valueForMoney: number = 0;

  onSaveUser() {
    this.userObj.rating = this.userRating;
    this.userObj.foodQuality = this.foodQuality;
    this.userObj.valueForMoney = this.valueForMoney;

    this.http
      .post<USER>('http://localhost:3000/users', this.userObj)
      .subscribe((res: USER) => {
        alert('thank you for you feedback');
        this.users.push(this.userObj);
        console.log(this.userObj);
      });
  }

  handleRating(rating: number): void {
    this.userRating = rating;
    console.log('Selected rating:', rating);
  }
}
export class USER {
  name: string;
  email: string;
  mobile: string;
  feedback: any;
  rating: number;
  foodQuality: number;
  valueForMoney: number;

  constructor() {
    this.name = '';
    this.email = '';
    this.mobile = '';
    this.feedback = '';
    this.rating = 0;
    this.foodQuality = 0;
    this.valueForMoney = 0;
  }
}

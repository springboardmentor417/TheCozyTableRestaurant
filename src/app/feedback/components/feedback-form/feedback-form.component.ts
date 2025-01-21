import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StarRatingComponent } from '../star-rating/star-rating.component';


@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    HttpClientModule,
    StarRatingComponent,
  ],
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css'],
})
export class FeedbackFormComponent {
  userObj: USER = new USER();
  users: USER[] = [];
  userRating: number = 0;
  foodQuality: number = 0;
  valueForMoney: number = 0;
  selectedDate: string = '';
  imageError: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  orderedItems = [
    { name: 'Pizza Margherita', quantity: 1, price: 120 },
    { name: 'Spaghetti Carbonara', quantity: 2, price: 150 },
    { name: 'Tiramisu', quantity: 1, price: 180 },
  ];

  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input?.files && input.files.length > 0) {
      const file = input.files[0];

      const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validImageTypes.includes(file.type)) {
        this.userObj.imageError = 'Only JPEG or PNG images are allowed.';
        this.userObj.image = null;
      } else if (file.size > 2 * 1024 * 1024) {
        this.userObj.imageError = 'File size should not exceed 2MB.';
        this.userObj.image = null;
      } else {
        this.userObj.imageError = '';
        const imagePath = '/uploads/images/' + file.name;
        this.userObj.image = imagePath;
      }
    }
  }

  validatePhoneNumber(phoneNumber: any) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phoneNumber);
  }

  onSaveUser(feedbackForm: any) {
    const formattedDate = this.formatDate(new Date(this.selectedDate));
    this.userObj.selectedDate = formattedDate;

    const username = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.userObj.name = username.username;
    this.userObj.email = username.email;
    this.userObj.mobile = username.phone;
    console.log(username);
    console.log(this.userObj.name);

    const today = this.formatDate(new Date());

    switch (true) {
      case !this.userObj.feedback: {
        alert('please give tell us your experience atleast in 10 charecters');
        return;
      }
      case !this.selectedDate: {
        alert('Please select the date.');
        return;
      }

      case formattedDate !== today: {
        alert("Please enter today's date.");
        return;
      }

      case feedbackForm.valid: {
        this.http
          .post<USER>('http://localhost:3000/feedback', this.userObj)
          .subscribe((res: USER) => {
            // alert('thank you for you feedback');
            this.users.unshift(this.userObj);
            console.log(this.userObj);
            this.router.navigate(['/ackpage']);
          });
        return;
      }
      default:
        alert('unotherized action');
        throw new Error('unotherized action');
    }
  }
}

class USER {
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
  orderedItems: any[];

  constructor() {
    this.name = '';
    this.email = '';
    this.mobile = '';
    this.feedback = '';
    this.rating = 0;
    this.foodQuality = 0;
    this.valueForMoney = 0;
    this.selectedDate = '';
    this.image = null;
    this.imageError = '';
    this.orderedItems=[];
  }
}

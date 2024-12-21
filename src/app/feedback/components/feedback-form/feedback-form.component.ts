import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { inject } from '@angular/core';
import { StarRateingComponent } from '../../../star-rateing/star-rateing.component';


@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [CommonModule,FormsModule,MatSlideToggleModule,MatSliderModule,MatDatepickerModule,MatNativeDateModule,MatInputModule,HttpClientModule,StarRateingComponent],
  templateUrl: './feedback-form.component.html',
  styleUrl: './feedback-form.component.css'
})
export class FeedbackFormComponent {
userObj: USER = new USER();
  http = inject(HttpClient);
  users: USER[] = [];
  userRating: number = 0;
  foodQuality: number = 0;
  valueForMoney: number = 0;
  selectedDate: string = '';

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  handleRating(rating: number): void {
    this.userRating = rating;
    console.log('Selected rating:', rating);
  }

  onSaveUser(feedbackForm: any) {
    const formattedDate = this.formatDate(new Date(this.selectedDate));
    this.userObj.selectedDate = formattedDate;
    if (feedbackForm.invalid) {
      alert('Please fill all the mandatory fields.');
    } else {
      this.http
        .post<USER>('http://localhost:3000/users', this.userObj)
        .subscribe((res: USER) => {
          alert('Thank you for you feedback');
          this.users.push(this.userObj);
          console.log(this.userObj);
        });
    }
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
  selectedDate: string;

  constructor() {
    this.name = '';
    this.email = '';
    this.mobile = '';
    this.feedback = '';
    this.rating = 0;
    this.foodQuality = 0;
    this.valueForMoney = 0;
    this.selectedDate = '';
  }
}
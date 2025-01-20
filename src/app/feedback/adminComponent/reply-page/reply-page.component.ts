import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reply-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reply-page.component.html',
  styleUrl: './reply-page.component.css',
})
export class ReplyPageComponent {
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

  toggleReplyForm(item: any) {
    item.showReplyForm = !item.showReplyForm;
  }

  submitReply(item: any) {
    if (item.adminReply.trim()) {
      const updatedItem = {
        adminReply: item.adminReply,
      };

      this.http
        .patch(`http://localhost:3000/feedback/${item.id}`, updatedItem)
        .subscribe((res) => {
          console.log('Reply saved successfully', res);
          item.showReplyForm = false;
        });
    } else {
      console.log('Reply is empty.');
    }
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
  adminReply: any;
  showReplyForm: boolean;

  image: string | null;
  imageError: string;
}

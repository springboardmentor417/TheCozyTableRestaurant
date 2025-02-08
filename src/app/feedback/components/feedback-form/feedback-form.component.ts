import { Component, OnInit } from '@angular/core';
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
export class FeedbackFormComponent implements OnInit {
  onImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
  
      // Extract only the file name (or full path if needed)
      this.userObj.image = `uploads/${file.name}`;
    }
  }
  
  userObj: USER = new USER();
  users: USER[] = [];
  userRating: number = 0;
  foodQuality: number = 0;
  valueForMoney: number = 0;
  selectedDate: string = '';
  imageError: string = '';
  orderedItems:any[]=[];
  myOrders:any;
  customerId:string='';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {

    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.customerId=user.id;
   console.log("id",this.customerId);
    this.fetchOrderedItems();


  }

  fetchOrderedItems() {
 
    const userId = this.customerId;  // Assuming this.customerId is set from localStorage
  this.http.get<any[]>('http://localhost:3000/orders').subscribe({
    next: (data) => {
 
      this.orderedItems = data
        .filter((order) => order.customerId === userId) // Filter by customerId
        .flatMap((order) =>
          order.items.map((item:any) => ({
            itemId:item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            rating: 0, // Placeholder for rating
          }))
        );
 
        console.log("%%%%%%5",this.orderedItems);
       
    },
    error: (error) => {
      console.error('Error fetching ordered items:', error);
    },
  });
 
  }
  onSaveUser(feedbackForm: any) {
    console.log("*************",feedbackForm)
    const formattedDate = this.formatDate(new Date(this.selectedDate));
    this.userObj.selectedDate = formattedDate;
  
    const username = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.userObj.name = username.username;
    this.userObj.orderedItems = this.orderedItems; // Save ordered items in feedback
  
    const today = this.formatDate(new Date());
  
    // Group ratings for each unique menu item
    const menuItemRatingsMap = new Map<string, number[]>();
  
    this.orderedItems.forEach((item:any) => {
      if (!menuItemRatingsMap.has(item.name)) {
        menuItemRatingsMap.set(item.name, []);
      }
      menuItemRatingsMap.get(item.name)?.push(item.rating);
    });
  
    // Update ratings for each unique menu item
    menuItemRatingsMap.forEach((ratings, itemName) => {
      this.http.get<any[]>(`http://localhost:3000/menu-items?name=${itemName}`)
        .subscribe((menuItems) => {
          if (menuItems.length > 0) {
            const menuItem = menuItems[0];
  
            // Append all collected ratings
            const updatedRatings = [...menuItem.rating, ...ratings];
  
            const updatedItem = {
              ...menuItem,
              rating: updatedRatings,
            };
  
            // Single PUT request per item
            this.http.put(`http://localhost:3000/menu-items/${menuItem.id}`, updatedItem)
              .subscribe(() => {
                console.log(`Updated ratings for ${itemName}:`, updatedRatings);
              });
          }
        });
    });
  
    // Validate form fields
    if (!this.userObj.feedback) {
      alert('Please tell us about your experience in at least 10 characters.');
      return;
    }
    if (!this.selectedDate) {
      alert('Please select the date.');
      return;
    }
    if (formattedDate !== today) {
      alert("Please enter today's date.");
      return;
    }
    if (!this.userObj.image) {
      alert('Please upload an image before submitting the feedback.');
      return;
    }
    if (!feedbackForm.valid) {
      alert('Unauthorized action');
      throw new Error('Unauthorized action');
    }
  
    // Save feedback details, including ordered items and image
    this.http.post<USER>('http://localhost:3000/feedback', this.userObj)
      .subscribe((res: USER) => {
        this.users.unshift(this.userObj);
        console.log('Feedback saved:', this.userObj);
        this.router.navigate(['/ackpage']);
      });
  }  

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}

interface OrderedItem {
  name: string;
  quantity: number;
  price: number;
  rating: number;
}

class USER {
  name: string;
  // email: string;
  // mobile: string;
  feedback: any;
  rating: number;
  foodQuality: number;
  valueForMoney: number;
  selectedDate: string;
  image: string | null;
  orderedItems: any[];

  constructor() {
    this.name = '';
    // this.email = '';
    // this.mobile = '';
    this.feedback = '';
    this.rating = 0;
    this.foodQuality = 0;
    this.valueForMoney = 0;
    this.selectedDate = '';
    this.image = null;
    this.orderedItems = [];
  }
}

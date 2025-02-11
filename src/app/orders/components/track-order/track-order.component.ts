// import { Component, OnInit} from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { CartService } from '../../services/cart.service';
// import { ServicesService } from '../../../User profile -authentication/services/services.service'

// @Component({
//   selector: 'app-track-order',
//   standalone: true,
//   imports:[CommonModule],
//   templateUrl: './track-order.component.html',
//   styleUrls: ['./track-order.component.css'],
// })
// export class TrackOrderComponent implements OnInit {
//   customerId: string | null = null;
//   orders: any[] = [];
//   errorMessage: string | null = null;
//   showProgress: { [key: string]: boolean } = {};

//   constructor(private cartService: CartService, private userService: ServicesService) {}

//   ngOnInit(): void {
//     // Retrieve customerId from localStorage (with a check)
//     const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
//     this.customerId=user.id;
//     console.log("%%%%%%%%%",this.customerId);
    
//     if (this.customerId) {
//       console.log('Customer ID found in localStorage:', this.customerId);
//       // Fetch orders for this customer
//       this.cartService.getOrdersByCustomerId(this.customerId).subscribe(
//         (orders) => {
//           this.orders = orders;
//         },
//         (error) => {
//           console.error('Error fetching orders:', error);
//           this.errorMessage = 'Failed to fetch orders.';
//         }
//       );
//     } else {
//       console.log('Customer ID not found in localStorage');
//       this.errorMessage = 'Customer not logged in. Please log in first.';
//     }
//   }
//   viewOrderStatus(orderId: string): void {
//     console.log('Tracking status for order:', orderId);

//   }
// }

import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ServicesService } from '../../../User profile -authentication/services/services.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-track-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css'],
})
export class TrackOrderComponent implements OnInit {
  customerId: string = ''; // Store logged-in customer's ID
  orders: any[] = [];
  showProgress: { [key: string]: boolean } = {}; // Track progress bar visibility

  constructor(private cartService: CartService, private userService: ServicesService) {}

  ngOnInit(): void {
    const user = this.userService.getLocalUser(); // Get logged-in user
    if (user) {
      this.customerId = user.id;
      this.fetchOrders();
    }
  }

  fetchOrders(): void {
    this.cartService.getOrdersByCustomerId(this.customerId).subscribe((data) => {
      this.orders = data.map((order) => ({
        id: order.id,
        items: order.items.map((item: any) => `${item.name} (*${item.quantity})`).join(', '),
        deliveryAddress: order.deliveryAddress,
        totalCost: order.totalAmount,
        status: order.status || 'Pending',
      }));
    });
  }

  formatAddress(address: any): string {
    return `${address.city}, ${address.state}`;
  }

  toggleProgress(orderId: string): void {
    this.showProgress[orderId] = !this.showProgress[orderId]; // Toggle progress bar
  }

  getProgressValue(status: string): number {
    switch (status) {
      case 'Pending': return 25;
      case 'Yet to be Delivered': return 50;
      case 'Cancelled': return 0;
      case 'Delivered': return 100;
      default: return 0;
    }
  }

  getProgressColor(status: string): string {
    switch (status) {
      case 'Pending': return 'bg-warning';
      case 'Yet to be Delivered': return 'bg-info';
      case 'Cancelled': return 'bg-danger';
      case 'Delivered': return 'bg-success';
      default: return 'bg-secondary';
    }
  }
}



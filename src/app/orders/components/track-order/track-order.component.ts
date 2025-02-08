import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ServicesService } from '../../../User profile -authentication/services/services.service'

@Component({
  selector: 'app-track-order',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css'],
})
export class TrackOrderComponent implements OnInit {
  customerId: string | null = null;
  orders: any[] = [];
  errorMessage: string | null = null;

  constructor(private cartService: CartService, private userService: ServicesService) {}

  ngOnInit(): void {
    // Retrieve customerId from localStorage (with a check)
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.customerId=user.id;
    console.log("%%%%%%%%%",this.customerId);
    
    if (this.customerId) {
      console.log('Customer ID found in localStorage:', this.customerId);
      // Fetch orders for this customer
      this.cartService.getOrdersByCustomerId(this.customerId).subscribe(
        (orders) => {
          this.orders = orders;
        },
        (error) => {
          console.error('Error fetching orders:', error);
          this.errorMessage = 'Failed to fetch orders.';
        }
      );
    } else {
      console.log('Customer ID not found in localStorage');
      this.errorMessage = 'Customer not logged in. Please log in first.';
    }
  }
  viewOrderStatus(orderId: string): void {
    console.log('Tracking status for order:', orderId);

  }
}


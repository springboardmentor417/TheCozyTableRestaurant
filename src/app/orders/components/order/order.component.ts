import { Component, OnInit } from '@angular/core
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-order',
  
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  // Properties for delivery address
  deliveryAddress = {
    name: 'Aparna  S',
    addressLine1: 'NO 1/11, Viswamelu Avenue, 12 Chitlapakkam Road',
    city: 'CHROMPET',
    state: 'CHENNAI, TAMIL NADU',
    postalCode: '600044',
  };

  // Properties for payment method
  paymentMethod = {

    cash:'Pay on delivery (Cash/Card)',
    
  };
  // Cart details and summary
  getCartDetails: any = [];
   deliveryFee = 80.0;
   promotionApplied = 20.0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCartDetails();
  }

  // Fetch cart details
  fetchCartDetails() {
    this.cartService.getCartDetails().subscribe(
      (response) => {
        this.getCartDetails = response;
        console.log('Cart details fetched:', this.getCartDetails);
      },
      (error) => {
        console.error('Error fetching cart details:', error);
      }
    );
  
    cash: 'Pay on delivery (Cash/Card)',
    credit: 'Credit card',
    Onlinepayments: 'UPI id(Gpay/phonepay/paytm)',
  };

  // Properties for order summary
  orderSummary = {
    items: 1733.0,
    deliveryFee: 80.0,
    promotionApplied: 20.0,
    savings: 540.0,
    discountPercent: 23,
  };

  // Computed property for the total amount
  get totalAmount(): number {
    return (
      this.orderSummary.items +
      this.orderSummary.deliveryFee -
      this.orderSummary.promotionApplied
    );
  }

  constructor(private router: Router) {}

  // Calculate total amount
  get totalAmount(): number {
    const cartTotal = this.getCartDetails.reduce(
      (total: number, item: any) => total + item.quantity * item.currentPrice,
      0
    );
    return cartTotal + this.deliveryFee - this.promotionApplied;
  }

  placeOrder(): void {

    const orderSummary = {
      items: this.getCartDetails,
      deliveryAddress: this.deliveryAddress,
      paymentMethod: this.paymentMethod.cash, // Adjust this if more payment methods are added
      totalAmount: this.totalAmount,
      deliveryFee: this.deliveryFee,
      promotionApplied: this.promotionApplied,
      orderDate: new Date().toDateString(),
    };

    // Save the order summary using the CartService
    this.cartService.saveOrder(orderSummary).subscribe(
      (response) => {
        console.log('Order saved successfully:', response);
        alert('Order placed successfully!');
        this.router.navigate(['/feedback']); // Navigate to home or any desired page
      },
      (error) => {
        console.error('Error saving order:', error);
        alert('Failed to place the order. Please try again.');
      }
    );

    const val = confirm('Order placed successfully!');
    console.log(val);
    if (val) this.router.navigate(['/redirect']);
  }
  
}



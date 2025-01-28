
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-order',
  
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  // Properties for delivery address
  deliveryAddress = {
    name: 'Aparna  S',
    addressLine1: 'NO 1/11, Viswamelu Avenue, 12 Chitlapakkam Road',
    city: 'CHROMPET',
    state: 'CHENNAI, TAMIL NADU',
    postalCode: '600044'
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
  }

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
  }
  
}




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
    credit:'Credit card',
    Onlinepayments:'UPI id(Gpay/phonepay/paytm)'

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
// Method to handle place order button click
  placeOrder(): void {
    alert('Order placed successfully!');
  }
}

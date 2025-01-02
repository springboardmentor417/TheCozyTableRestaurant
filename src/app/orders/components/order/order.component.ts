
import { Component, OnInit } from '@angular/core';

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
  

  // Properties for order summary
  orderSummary = {
    items: 1733.00,
    deliveryFee: 80.00,
    promotionApplied: 20.00,
    savings: 540.00,
    discountPercent: 23
  };

  // Computed property for the total amount
  get totalAmount(): number {
    return this.orderSummary.items + this.orderSummary.deliveryFee - this.orderSummary.promotionApplied;
  }

  constructor() {}

  ngOnInit(): void {}

  // Method to handle place order button click
  placeOrder(): void {
    alert('Order placed successfully!');
  }
}

import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {}

  // Method to handle place order button click
  placeOrder(): void {
    const val = confirm('Order placed successfully!');
    console.log(val);
    if (val) this.router.navigate(['/redirect']);
  }
}

import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServicesService } from '../../../User profile -authentication/services/services.service';


@Component({
  selector: 'app-order',
  imports:[CommonModule],
  standalone:true,
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  // Properties for delivery address
  deliveryAddress :any;

  paymentMethod = {

    cash:'Pay on delivery (Cash/Card)',
    
  };
  customerId:string='';
  itemsArray:any=[];
  // Cart details and summary
  getCartDetails: any = [];
   deliveryFee = 80.0;
   promotionApplied = 20.0;

  constructor(private cartService: CartService, private router: Router,private auth:ServicesService ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.customerId=user.id;
    this.fetchCartDetails();
    this.featchUser(this.customerId);
  }

  // Fetch cart details
  fetchCartDetails() {
    this.cartService.getCartDetails().subscribe(
      (response) => {
        //this.getCartDetails = response;
        this.getCartDetails = response
        .filter((cart: any) => cart.customerId === this.customerId)
        .flatMap((cart: any) => cart.items.map((item: any) => ({
          ...item, // Spread to retain all properties
          cartId: cart.id // Preserve cart ID for future reference
        })));
        console.log('Cart details fetched:', this.getCartDetails);
      },
      (error) => {
        console.error('Error fetching cart details:', error);
      }
    );  

  };

  featchUser(userid:any){
    this.auth.getUserById(userid).subscribe((data:any)=>{
      console.log("user",data);
      this.deliveryAddress=data.address;
    }) 
  }

  get totalAmount(): number {
    const cartTotal = this.getCartDetails.reduce(
      (total: number, item: any) => total + item.quantity * item.price,
      0
    );
    return cartTotal + this.deliveryFee - this.promotionApplied;
  }

  
  placeOrder(): void {
    const orderSummary = {
      items: this.getCartDetails,
      customerId:this.customerId,
      status:'pending',
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
  
        // Empty the cart after the order is placed
        this.cartService.clearCart1(this.customerId).subscribe(
          () => {
            console.log("Cart has been cleared!");
            this.cartService.updateCartCount();
            // Optionally, update the UI or redirect to another page
            this.router.navigate(['/feedback']);
          },
          (error) => {
            console.error('Failed to clear cart:', error);
          }
        );
      },
      (error) => {
        console.error('Error saving order:', error);
        alert('Failed to place the order. Please try again.');
      }
    );
  }
  

  // placeOrder(): void {

  //   const orderSummary = {
  //     items: this.getCartDetails,
  //     deliveryAddress: this.deliveryAddress,
  //     paymentMethod: this.paymentMethod.cash, // Adjust this if more payment methods are added
  //     totalAmount: this.totalAmount,
  //     deliveryFee: this.deliveryFee,
  //     promotionApplied: this.promotionApplied,
  //     orderDate: new Date().toDateString(),
  //   };

  //   // Save the order summary using the CartService
  //   this.cartService.saveOrder(orderSummary).subscribe(
  //     (response) => {
  //       console.log('Order saved successfully:', response);
        
  //       alert('Order placed successfully!');
  //       this.cartService.clearCart1(this.customerId);

  //       this.router.navigate(['/feedback']);
  //     },
  //     (error) => {
  //       console.error('Error saving order:', error);
  //       alert('Failed to place the order. Please try again.');
  //     }
  //   );

  //   const val = confirm('Order placed successfully!');
  //   console.log(val);
  //   if (val) this.router.navigate(['/redirect']);
  // }
  
}
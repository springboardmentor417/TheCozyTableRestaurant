import { NgFor } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-cart',
    standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  getCartDetails: any = [];

  constructor(private cartService: CartService,private router: Router) {}

  ngOnInit(): void {
    this.cartDetails();
  }

  cartDetails() {
    this.cartService.getCartDetails().subscribe(
      (response) => {
        this.getCartDetails = response;
        console.log(this.getCartDetails);
      },
      (error) => {
        console.error('Error fetching cart details:', error);
      }
    );
  }

  // Increase quantity
  increaseQuantity(cartItem: any) {
    cartItem.quantity += 1; // Increment quantity
    this.cartService.updateCartItem(cartItem.id, cartItem).subscribe(
      (response) => {
        console.log('Quantity increased:', response);
      },
      (error) => {
        console.error('Error updating quantity:', error);
      }
    );
  }

  // Decrease quantity but prevent going below 1
  decreaseQuantity(cartItem: any) {
    if (cartItem.quantity > 1) { // Prevent going below 1
      cartItem.quantity -= 1; // Decrement quantity
      this.cartService.updateCartItem(cartItem.id, cartItem).subscribe(
        (response) => {
          console.log('Quantity decreased:', response);
        },
        (error) => {
          console.error('Error updating quantity:', error);
        }
      );
    }
  }

  // Calculate the total price of items in the cart
  calculateTotal() {
    return this.getCartDetails.reduce(
      (total: number, item: any) => total + item.quantity * item.currentPrice,
      0
    );
  }
  


  goToOrder(): void {
    this.router.navigate(['/order']);
  }
}

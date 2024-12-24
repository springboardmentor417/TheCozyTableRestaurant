import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service'; 



@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  getCartDetails: any = [];

  constructor(private cartService: CartService) {}

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
}

import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  foodArray = [
    {
      foodID: 1,
      img: "../../assets/OIP (1).jpg",
      name: "samosa",
      type: "starter",
      currentPrice: 35,
      originalPrice: 50,
      discount: 10,
      quantity: 1 
    },
    {
      foodID: 4,
      img: "../../assets/OIP (3).jpg",
      name: "samosa",
      type: "starter",
      currentPrice: 135,
      originalPrice: 150,
      discount: 10,
      quantity: 1 
    },
    {
      foodID: 2,
      img: "../../assets/OIP.jpg",
      name: "samosa",
      type: "starter",
      currentPrice: 135,
      originalPrice: 150,
      discount: 10,
      quantity: 1 
    },
    {
      foodID: 3,
      img: "../../assets/OIP (2).jpg",
      name: "samosa",
      type: "starter",
      currentPrice: 150,
      originalPrice: 135,
      discount: 10,
      quantity: 1
    }
  ];

  constructor(private cartService: CartService) {}

  
  addCart(food: any) {
    food.quantity = 1; // Initialize quantity =1 when adding to cart
    this.cartService.addCartItem(food).subscribe(
      (response) => {
        console.log('Item added to cart:', response);
      },
      (error) => {
        console.error('Error adding item to cart:', error);
      }
    );
  }
}

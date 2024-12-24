import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports:[NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 foodArray=[
  {
  foodID:1,
  img:"../../assets/OIP (1).jpg",
  name:"samosa",
  type:"starter",
  currentPrice:135,
  originalPrice:150,
  discount:10,
  },
  {
     foodID:4,
    img:"../../assets/OIP (3).jpg",
    name:"samosa",
    type:"starter",
    currentPrice:135,
    originalPrice:150,
    discount:10,
    },
    { 
      foodID:2,
      img:"../../assets/OIP.jpg",
      name:"samosa",
      type:"starter",
      currentPrice:135,
      originalPrice:150,
      discount:10,
      },

      { 
        foodID:3,
        img:"../../assets/OIP (2).jpg",
        name:"samosa",
        type:"starter",
        currentPrice:150,
        originalPrice:135,
        discount:10,
        }
 ];

 
/*addCart(food: any) {
  console.log(food);
  let cartDataNULL = localStorage.getItem('localcart');
  if (cartDataNULL === null) {
    // No data in local storage, initialize with the first item
    let storeData: any[] = [];
    storeData.push(food);
    localStorage.setItem('localcart', JSON.stringify(storeData));
  } else {
    try {
      // Data exists, parse it and ensure it is an array
      let cartItems = JSON.parse(cartDataNULL) as any[];

      if (cartItems) {
        let existingIndex = cartItems.findIndex((item: any) => item.foodID === food.foodID);

        if (existingIndex === -1) {
          cartItems.push(food);
        } else {
          // If item already exists, update it
          cartItems[existingIndex] = food;
        }
      } else {
        throw new Error('Parsed cart data is not an array');
      }

      localStorage.setItem('localcart', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error parsing cart data from localStorage:", error);
      // If parsing fails, reset the cart to an empty state
      localStorage.removeItem('localcart');
      let storeData: any[] = [];
      storeData.push(food);
      localStorage.setItem('localcart', JSON.stringify(storeData));
    }
  }
}
}*/

constructor(private cartService: CartService) {}

addCart(food: any) {
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
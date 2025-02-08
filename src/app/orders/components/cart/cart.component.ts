import { NgFor } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { CartService } from '../../services/cart.service';
import { MenuService } from '../../../menu-management/services/menu.service';


@Component({
  selector: 'app-cart',
    standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  getCartDetails: any = [];
  customerId:string='';
  itemsArray:any=[];
  constructor(private cartService: CartService,private router: Router,private menuService:MenuService) {}

  ngOnInit(): void {

    this.cartDetails();
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.customerId=user.id;
    
  }

  cartDetails() {
    this.cartService.getCartDetails().subscribe(
      (response) => {
        this.getCartDetails = response;
             
        // console.log("CCCCCC",this.getCartDetails);
      },
      (error) => {
        console.error('Error fetching cart details:', error);
      }
    );

    setTimeout(() => {
      console.log("Executed after 3 seconds");
      this.getCartDetails.forEach((order: { items: any[],id:any}) => {
        console.log("hereee")
        order.items.forEach((item1) => {
          this.menuService.getMenuItemsById(item1.itemid).subscribe(
            (response) => {
              this.itemsArray.push({ ...response, quantity: item1.quantity,cartId:order.id })
              // this.itemsArray.push(response);
              console.log(this.itemsArray);
            },
            (error) => {
              console.error('Error fetching item details:', error);
            }
          );
        });
      });
  
    }, 700); // Delay of 3000ms (3 seconds)
    
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
    if (cartItem.items.quantity > 1) { // Prevent going below 1
      cartItem.quantity -= 1; // Decrement quantity
      this.cartService.updateCart(cartItem).subscribe(
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
  // calculateTotal() {
  //   return this.getCartDetails.reduce(
  //     (total: number, item: any) => total + item.quantity * item.currentPrice,
  //     0
  //   );
  // }
  calculateTotal(): number {
    return this.itemsArray.reduce((total: number, item: { price: number; quantity: number; }) => total + item.price * item.quantity, 0);
  }
  
   // Remove an item from the cart
   removeItem(cart: any): void {
    
    const cartEntry = this.getCartDetails.find((entry: { customerId: string; }) => entry.customerId === this.customerId);
    console.log(cartEntry)
    cartEntry.items = cartEntry.items.filter((item: { itemid: string; }) => item.itemid !== cart.id);
    console.log("bbbbbbbbbbb",cartEntry)
   
      
      this.cartService.updateCart(cartEntry).subscribe(
        (response) => {
          console.log('Item removed from cart:', response);
        },
        (error) => {
          console.error('Error removing item:', error);
        }
      ); 
    // }
    this.itemsArray=[];
    setTimeout(() => {
    this.cartDetails();
     }, 700);
  }


  goToOrder(): void {
    this.router.navigate(['/order']);
  }
  
}

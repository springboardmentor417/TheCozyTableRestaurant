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

    
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.customerId=user.id;
    this.cartDetails();
    
  }

  cartDetails() {
    this.cartService.getCartDetails().subscribe(
      (response) => {
        this.getCartDetails = response;
        this.itemsArray = response
        .filter((cart: any) => cart.customerId === this.customerId)
        .flatMap((cart: any) => cart.items.map((item: any) => ({
          ...item, // Spread to retain all properties
          cartId: cart.id // Preserve cart ID for future reference
        })));
      
      console.log("Flattened ItemsArray:", this.itemsArray);
      //   this.itemsArray = response.filter((item: any) => item.customerId === this.customerId);     
      //  console.log("CCCCCC",this.itemsArray);
      },
      (error) => {
        console.error('Error fetching cart details:', error);
      }
    );

    // setTimeout(() => {
    //   console.log("Executed after 3 seconds");
    //   this.getCartDetails.forEach((order: { items: any[],id:any}) => {
    //     console.log("hereee")
    //     order.items.forEach((item1) => {
    //       this.menuService.getMenuItemsById(item1.itemid).subscribe(
    //         (response) => {
    //           this.itemsArray.push({ ...response, quantity: item1.quantity,cartId:order.id })
    //           // this.itemsArray.push(response);
    //           console.log(this.itemsArray);
    //         },
    //         (error) => {
    //           console.error('Error fetching item details:', error);
    //         }
    //       );
    //     });
    //   });
  
    // }, 700); 
    
  }

  increaseQuantity(item: any) {

    item.quantity += 1;
    this.updateCartItem(item);
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.updateCartItem(item);
    }
  }

  updateCartItem(item: any) {
    console.log("updatedIted",item)
    this.cartService.getCartDetails().subscribe((cartData) => {
      const cart = cartData.find((cart: any) => cart.id === item.cartId);
      if (cart) {
        const updatedItems = cart.items.map((cartItem: any) =>
          cartItem.id === item.id ? { ...cartItem, quantity: item.quantity } : cartItem
        );

        const updatedCart = { ...cart, items: updatedItems };

        this.cartService.updateCart(item.cartId, updatedCart).subscribe(
          () => console.log('Cart updated successfully'),
          (error) => console.error('Error updating cart:', error)
        );
      }
    });
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item.cartId, item.id).subscribe(
      () => {
        this.itemsArray = this.itemsArray.filter((cartItem:any) => cartItem.id !== item.id);
        this.cartService.updateCartCount();
        console.log('Item removed successfully');
      },
      (error) => {
        console.error('Error removing item:', error);
      }
    );
  }

  

  // Increase quantity
  // increaseQuantity(cartItem: any) {
  //   console.log("CartItem",cartItem);
  //   cartItem.quantity += 1; // Increment quantity
  //   this.cartService.updateCartItem(cartItem.id, cartItem).subscribe(
  //     (response) => {
  //       console.log('Quantity increased:', response);
  //     },
  //     (error) => {
  //       console.error('Error updating quantity:', error);
  //     }
  //   );
  // }

  // Decrease quantity but prevent going below 1
  // decreaseQuantity(cartItem: any) {
  //   console.log("cartItem",cartItem);
  //   if (cartItem.quantity > 1) { // Prevent going below 1
  //     cartItem.quantity -= 1; // Decrement quantity
  //     this.cartService.updateCart(cartItem).subscribe(
  //       (response) => {
  //         console.log('Quantity decreased:', response);
  //       },
  //       (error) => {
  //         console.error('Error updating quantity:', error);
  //       }
  //     );
  //   }
  // }

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

  // removeItem(cart: any){
  // console.log("cart",cart);
  // }

  
   // Remove an item from the cart
  //  removeItem(cart: any): void {
    
  //   const cartEntry = this.getCartDetails.find((entry: { customerId: string; }) => entry.customerId === this.customerId);
  //   console.log(cartEntry)
  //   cartEntry.items = cartEntry.items.filter((item: { itemid: string; }) => item.itemid !== cart.id);
  //   console.log("bbbbbbbbbbb",cartEntry)
   
      
  //     this.cartService.updateCart(cartEntry).subscribe(
  //       (response) => {
  //         console.log('Item removed from cart:', response);
  //       },
  //       (error) => {
  //         console.error('Error removing item:', error);
  //       }
  //     ); 
  //   // }
  //   // this.itemsArray=[];
  //   // setTimeout(() => {
  //   // this.cartDetails();
  //   //  }, 700);
  // }


  goToOrder(): void {
    this.router.navigate(['/order']);
  }
  
}

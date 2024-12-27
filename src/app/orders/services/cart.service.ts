import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:3000/cart';

  constructor(private http: HttpClient) {}

  // Get all cart items
  getCartDetails(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Add an item to the cart
  addCartItem(cart: any): Observable<any> {
    return this.getCartDetails().pipe(
      switchMap((cartItems: any[]) => {
        const existingItem = cartItems.find((item) => item.foodID === cart.foodID);
        if (existingItem) {
          // If item exists, increment quantity
          existingItem.quantity += 1;
          return this.updateCartItem(existingItem.id, existingItem);
        } else {
          // If item doesn't exist, add new item to cart
          return this.http.post(this.apiUrl, cart);
        }
      })
    );
  }

  // Update an existing cart item
  updateCartItem(id: number, cartItem: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, cartItem);
  }

  // Remove an item from the cart
  removeCartItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, forkJoin, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:3000/cart'; // Endpoint for cart items
  private ordersUrl = 'http://localhost:3000/orders'; // Endpoint for orders
  private usersUrl = 'http://localhost:3000/users'; // Endpoint for users

  private cartCountSubject = new BehaviorSubject<number>(0); // To track cart count
  
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(private http: HttpClient) {
    this.updateCartCount(); // Initialize cart count on service load
  }

  // ✅ Fetch all cart items
  getCartDetails(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
 
  clearCart1(cartId: string): Observable<any> {
    console.log("Clearing cart for:", cartId);
  
    return this.http.get<any[]>(this.apiUrl).pipe( // Fetch all cart data
      switchMap((cartData) => {
        console.log("Fetched Cart Data:", cartData);
  
        // Find cart based on `customerId` (or cart.id if using cartId to uniquely identify)
        const cart = cartData.find((cart: any) => cart.customerId === cartId);
        console.log("Found Cart:", cart);
  
        if (cart) {
          const updatedCart = { ...cart, items: [] }; 
          // this.updateCartCount();
          return this.http.put(`${this.apiUrl}/${cart.id}`, updatedCart); // PUT request to update cart
        } else {
          console.error("Cart not found");
          return throwError(() => new Error('Cart not found'));
        }
      })
    );
  }
  // clearCart1(cartId: string): Observable<any> {
  //   console.log("Deleting cart for:", cartId);
  
  //   return this.http.get<any[]>(this.apiUrl).pipe(
  //     switchMap((cartData) => {
  //       console.log("Fetched Cart Data:", cartData);
  
  //       // Find the cart by `cartId`
  //       const cartIndex = cartData.findIndex((cart: any) => cart.id === cartId);
  //       console.log("Found Cart:", cartIndex);
  
  //       if (cartIndex !== -1) {
  //         // Remove the cart by index
  //         cartData.splice(cartIndex, 1);
  
  //         // PUT request to update the cart collection (effectively deleting the cart)
  //         return this.http.put(this.apiUrl, cartData);
  //       } else {
  //         console.error("Cart not found");
  //         return throwError(() => new Error('Cart not found'));
  //       }
  //     })
  //   );
  // }
  
  
  


  addCartItem(items: any, customerId: string): Observable<any> {
    console.log(items, customerId);
    const quantity = 1;
    const newItem = { ...items, quantity };
  
    return this.getCartDetails().pipe(
      switchMap((cartItems: any[]) => {
        // ✅ Find the existing cart entry for the customer
        let existingEntry = cartItems.find(entry => entry.customerId === customerId);
  
        if (existingEntry) {
          // ✅ Check if the item already exists in the cart
          let existingItem = existingEntry.items.find((item: any) => item.id === items.id);
  
          if (existingItem) {
            // ✅ If the item exists, increment the quantity
            existingItem.quantity += 1;
          } else {
            // ✅ If item does not exist, add it to the items array
            existingEntry.items.push(newItem);
          }
  
          // ✅ Use PUT to update the existing cart entry
          return this.http.put(`${this.apiUrl}/${existingEntry.id}`, existingEntry).pipe(
            switchMap(() => {
              this.updateCartCount();
              return of(existingEntry);
            })
          );
        } else {
          // ✅ If no cart entry exists for the customer, create a new one
          return this.http.post(this.apiUrl, { customerId, items: [newItem] }).pipe(
            switchMap(() => {
              this.updateCartCount();
              return of({ customerId, items: [newItem] });
            })
          );
        }
      })
    );
  }

  updateCart(cartId: string, updatedCart: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${cartId}`, updatedCart);
  }

  removeCartItem(cartId: string, itemId: string): Observable<any> {
    return this.getCartDetails().pipe(
      switchMap((cartData) => {
        const cart = cartData.find((cart: any) => cart.id === cartId);
        if (cart) {
          const updatedItems = cart.items.filter((item: any) => item.id !== itemId);
          const updatedCart = { ...cart, items: updatedItems };
  
          return this.http.put(`${this.apiUrl}/${cartId}`, updatedCart);
        } else {
          return throwError(() => new Error('Cart not found'));
        }
      })
    );
  }
  

  // ✅ Update a cart item
  //  updateCart(cartItem: any): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/${cartItem.id}`, cartItem).pipe(
  //     switchMap(() => {
  //       this.updateCartCount();
  //       return of(cartItem);
  //     })
  //   );
  // }

 

  updateCartItem(customerId: string, itemid: string): Observable<any> {
    return this.getCartDetails().pipe(
      switchMap((cart) => {
        let updatedCart;
  
        // Find the customer's cart
        let customerCart = cart.find((order: { customerId: string; }) => order.customerId === customerId);
        if (!customerCart) {
          return of(null); // No cart found for this customer
        }
  
        // Find the item in the cart
        let itemIndex = customerCart.items.findIndex((item: { itemid: string; }) => item.itemid === itemid);
        if (itemIndex === -1) {
          return of(null); // Item not found
        }
  
        // ✅ Reduce quantity or remove item
        if (customerCart.items[itemIndex].quantity > 1) {
          customerCart.items[itemIndex].quantity -= 1;
        } else {
          customerCart.items.splice(itemIndex, 1); // Remove item if quantity is 1
        }
  
        updatedCart = { ...customerCart };
  
        // ✅ Send updated cart to server
        return this.http.put(`${this.apiUrl}/${customerCart.id}`, updatedCart).pipe(
          switchMap(() => {
            this.updateCartCount(); // Update count after modification
            return of(updatedCart);
          })
        );
      })
    );
  }
  
  // ✅ Remove a cart item
  // removeCartItem(id: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/${id}`).pipe(
  //     switchMap(() => {
  //       this.updateCartCount();
  //       return of(id);
  //     })
  //   );
  // }

  // removeCartItem(customerId: string, itemid: string): void {

    
  // //   return this.getCartDetails().pipe(
  // //     switchMap((cart) => {
  // //       // Find the customer's cart
  // //       let customerCart = cart.find((order: { customerId: string; }) => order.customerId === customerId);
  // //       if (!customerCart) {
  // //         return of(null); // No cart found for this customer
  // //       }
  
  // //       // Remove the specific item
  // //       const tempItems = customerCart.items.filter((item: { itemid: string; }) => item.itemid !== itemid);
  // // console.log("GGGGGGGGGGGG",tempItems)
  // //       if (tempItems.length > 0) {
  // //         // ✅ If items remain, update the cart using PUT
  // //         return this.http.put(`${this.apiUrl}/${customerCart.id}`, tempItems).pipe(
  // //           switchMap(() => {
  // //             this.updateCartCount();
  // //             return of(tempItems);
  // //           })
  // //         );
  // //       } else {
  // //         // ❌ If no items remain, DELETE the cart entry
  // //         return this.http.delete(`${this.apiUrl}/${customerCart.id}`).pipe(
  // //           switchMap(() => {
  // //             this.updateCartCount();
  // //             return of(customerCart.id);
  // //           })
  // //         );
  // //       }
  // //     })
  // //   );
  // }



  // ✅ Save order
  saveOrder(order: any): Observable<any> {
    return this.http.post(this.ordersUrl, order);
  }

  // ✅ Update cart count
//   updateCartCount(): void {
//     // this.getCartDetails().subscribe((cartItems: any[]) => {
//     //   const totalCount = cartItems.reduce((count, item) => count + item.quantity, 0);
//     //   this.cartCountSubject.next(totalCount);
//     // });
//     // this.getCartCount();
//        let totalQuantity = 0;
//     this.getCartDetails().subscribe((cart) => {
    
//         cart.forEach((order: { items: { quantity: any; }; }) => {
//           if (order.items) {
            
//               // If `items` is a single object (not an array)
//               totalQuantity += order.items.quantity || 0;
//             }
          
//         });
//       console.log("total count",totalQuantity)
//       this.cartCountSubject.next(totalQuantity);
//   })
// }

updateCartCount(): void {
  let totalQuantity = 0;

  this.getCartDetails().subscribe((cart) => {
    cart.forEach((order: { items: { quantity: number }[] }) => {
      if (order.items && Array.isArray(order.items)) {
        totalQuantity += order.items.reduce((sum, item) => sum + item.quantity, 0);
      }
    });

    console.log("Total Cart Count:", totalQuantity);
    this.cartCountSubject.next(totalQuantity);
  });
}


  // ✅ Clear cart
clearCart(): Observable<any> {
    return this.getCartDetails().pipe(
      switchMap((cartItems: any[]) => {
        if (cartItems.length === 0) {
          this.cartCountSubject.next(0);
          return of({ success: true });
        }
        const deleteRequests = cartItems.map((item) =>
          this.http.delete(`${this.apiUrl}/${item.id}`)
        );
        return forkJoin(deleteRequests).pipe(
          switchMap(() => {
            this.cartCountSubject.next(0);
            return of({ success: true });
          })
        );
      })
    );
  }

  // ✅ Get all orders of a specific customer by customerId
  getOrdersByCustomerId(customerId: string): Observable<any[]> {
    return this.http.get<any[]>(this.ordersUrl).pipe(
      switchMap((orders: any[]) => {
        const customerOrders = orders.filter((order) => order.customerId === customerId);
        return of(customerOrders);
      })
    );
  }

  // ✅ Get a single order by order ID
  getOrderById(orderId: string): Observable<any> {
    return this.http.get<any>(`${this.ordersUrl}/${orderId}`);
  }

  // ✅ Update order status properly in db.json
  updateOrderStatus(orderId: string, updatedStatus: any): Observable<any> {
    return this.http.patch(`${this.ordersUrl}/${orderId}`, updatedStatus);
  }

  // ✅ Get the latest order placed
  getLatestOrder(): Observable<any> {
    return this.http.get<any[]>(this.ordersUrl).pipe(
      switchMap((orders: any[]) => {
        if (orders.length > 0) {
          return of(orders[orders.length - 1]); // Get the last order
        } else {
          return of(null); // No orders found
        }
      })
    );
  }

  // ✅ Get customer details by customer ID
  getCustomerById(customerId: string): Observable<any> {
    return this.http.get<any>(`${this.usersUrl}/${customerId}`);
  }

  // ✅ Fetch all orders (Admin or global orders)
  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.ordersUrl);
  }
}

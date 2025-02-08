import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css'],
})
export class ManageOrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.cartService.getAllOrders().subscribe((data) => {
      this.orders = data.map((order) => ({
        id: order.id,
        customerName: order.deliveryAddress.name || "Unknown",
        productName: order.items.length > 0 
          ? order.items.map((item: any) => `${item.name} (*${item.quantity})`).join(', ')
          : 'No Items',
        deliveryAddress: this.formatAddress(order.deliveryAddress),
        totalCost: order.totalAmount,
        status: order.status || 'Pending',
      }));
    });
  }

  formatAddress(address: any): string {
    return `${address.city}, ${address.state}`;
  }

  updateStatus(orderId: string, newStatus: string): void {
    this.cartService.updateOrderStatus(orderId, { status: newStatus }).subscribe(() => {
      this.fetchOrders(); // Refresh the order list after updating
      alert(`Order ${orderId} status updated to ${newStatus}`);
    });
  }
}

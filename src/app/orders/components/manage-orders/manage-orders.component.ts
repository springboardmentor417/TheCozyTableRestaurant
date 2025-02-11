import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent {
  orders: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders() {
    this.http.get<any[]>('http://localhost:3000/orders').subscribe(data => {
      this.orders = data.map(order => ({
        id: order.id,
        // customerName: order.deliveryAddress.name,
        productName: order.items && order.items.length > 0 
          ? order.items.map((item: any) => `${item.name} (*${item.quantity})`).join(', ') 
          : 'No Items',
        deliveryAddress: order.deliveryAddress,
        totalCost: order.totalAmount,
        status: order.status || 'Pending'
      }));
    });
  }

  calculateTotalCost(order: any): number {
    const itemsTotal = order.items.reduce((sum: number, item: any) => sum + item.currentPrice * item.quantity, 0);
    const totalCost = itemsTotal + order.deliveryFee - order.promotionApplied;
    return totalCost;
  }

  formatAddress(address: any): string {
    return `${address.name}, ${address.addressLine1}, ${address.city}, ${address.state}, ${address.postalCode}`;
  }

  updateStatus(orderId: string, newStatus: string) {
    this.http.patch(`http://localhost:3000/orders/${orderId}`, { status: newStatus }).subscribe(() => {
      this.orders = this.orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      alert(`Order ${orderId} status updated to ${newStatus}`);
    });
  }
}

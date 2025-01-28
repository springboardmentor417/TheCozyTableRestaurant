import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { CommonModule } from '@angular/common';

export interface Reservation {
  status: string;
  id: string;
  tableId: number;
  customerName: string;
  contact: string;
  date: string;
  time: string;
  seats: number;
  // status?: string; // "pending", "approved", or "rejected"
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationService.getReservations().subscribe(
      (data: Reservation[]) => {
        // const currentUrl = this.reservationService.router.url;
        // // if (currentUrl.includes('/admin/reservations/approve')) {
        // //   this.reservations = data.filter((res) => res.status === 'pending');
        // // } else
        // if (currentUrl.includes('/admin/reservations/decline')) {
        //   this.reservations = data.filter((res) => res.status === 'pending');
        // } else {
        //   this.reservations = data;
        // }
        this.reservations = data;
      },
      (error) => {
        console.error('Error loading reservations:', error);
        alert('Failed to load reservations. Please try again later.');
      }
    );
  }


  // approveReservation(reservationId: number) {
  //   this.reservationService.updateReservationStatus(reservationId, 'approved').subscribe(
  //     (response) => {
  //       alert('Reservation approved successfully!');
  //       this.loadReservations();
  //     },
  //     (error) => {
  //       alert('Failed to approve reservation.');
  //     }
  //   );
  // }

  rejectReservation(reservationId: string, index: number): void {
    if (confirm('Are you sure you want to reject this reservation?')) {
      this.reservationService.updateReservationStatus(reservationId, 'rejected').subscribe({
        next: () => {
          alert('Reservation rejected successfully.');
          this.reservations[index].status = 'rejected';
        },
        error: (err) => {
          console.error('Error rejecting reservation:', err);
          alert('Failed to reject reservation.');
        },
      });
    }
  }
}

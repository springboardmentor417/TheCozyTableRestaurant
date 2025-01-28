import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-edit-reservation',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.css']
})
export class EditReservationComponent implements OnInit {
  reservationId!: string;
  reservationData: any = {};
  selectedTable:any=[]
  

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reservationId = String(this.route.snapshot.paramMap.get('id'));
    
    this.loadReservation();
  }
  

  loadReservation(): void {
    this.reservationService.getReservationById(this.reservationId).subscribe(
      (data) => {
        this.reservationData = data;
        this.selectedTable=this.reservationData.tableId;
      },
      (error) => {
        console.error('Error loading reservation:', error);
        alert('Failed to load reservation details.');
      }
    );
  }

  updateReservation(): void {
    this.reservationService.updateReservation(this.reservationData).subscribe(
      () => {
        alert('Reservation updated successfully!');
        this.router.navigate(['/reservation']);
      },
      (error) => {
        console.error('Error updating reservation:', error);
        alert('Failed to update reservation. Please try again.');
      }
    );
  }
  cancelEdit() {
    this.router.navigate(['/reservation']); // Navigate back to reservations page
  }
}

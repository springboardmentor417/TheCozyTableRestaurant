import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Table } from '../reservation/reservation.component';

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
  tables: any[] = []; 
  maxSeats: number = 1;

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reservationId = String(this.route.snapshot.paramMap.get('id'));
    
    this.loadReservation();
  }
  loadTables() {
    this.reservationService.getTables().subscribe(
      (data) => {
        this.tables = data;
  
        // Now that tables are loaded, find the correct table
        if (this.reservationData.tableId) {
          this.selectedTable = this.tables.find(table => table.id === this.reservationData.tableId) || null;
          console.log('Selected Table:', this.selectedTable);
          console.log('Max Seats:', this.selectedTable?.Seats);
        }
      },
      (error) => {
        console.error('Error loading tables:', error);
        alert('Failed to load tables. Please try again later.');
      }
    );
  }
  
  
  loadReservation(): void {
    this.reservationService.getReservationById(this.reservationId).subscribe(
      (data) => {
        this.reservationData = data;
  
        // Ensure tables are already loaded before finding the selected table
        this.loadTables();
  
        console.log('Reservation Data:', this.reservationData);
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

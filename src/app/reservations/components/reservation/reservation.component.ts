import { Component } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
interface TimeSlot {
  time: string;
  isReserved: boolean;
}

interface Table {
  id: number;
  seats: number;
  reservations: {
    [date: string]: { [time: string]: boolean };
  };
  timeSlots?: TimeSlot[];
}
@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  tables: Table[] = [
    {
      id: 1,
      seats: 4,
      reservations: {},
    },
    {
      id: 2,
      seats: 6,
      reservations: {},
    },
    {
      id: 3,
      seats: 2,
      reservations: {},
    },
  ];

  // availableTables: (Table & { timeSlots: TimeSlot[] })[] = [];
  // selectedDate = '';
  reservationData = {
    tableId: 0,
    date: '',
    time: '',
    customerName: '',
    contact: '',
    seats: 1,
  };
  availableTables: any[] = [];
  selectedDate: string = '';
  selectedTable: any = null;
  selectedTimeSlot: string | null = null;
  showReservationForm: boolean = false;
  // reservationData = {
  //   customerName: '',
  //   contact: '',
  //   seats: 1,
  // };

  constructor(private reservationService: ReservationService) {}

  onDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedDate = input.value;
    this.filterAvailableTables();
  }

  filterAvailableTables() {
    this.availableTables = this.tables.map((table) => {
      const reservations = table.reservations[this.selectedDate] || {};
      const timeSlots = this.generateTimeSlots().map((time) => ({
        time,
        isReserved: !!reservations[time],
      }));
      return { ...table, timeSlots };
    });
  }

  reserveTimeSlot(tableId: number, time: string) {
    this.selectedTable = this.tables.find((t) => t.id === tableId);
    this.selectedTimeSlot = time;
    this.showReservationForm = true;
  }

  submitReservation() {
    if (!this.selectedTable || !this.selectedTimeSlot) return;
  
    const table = this.selectedTable;
    const date = this.selectedDate;
    const time = this.selectedTimeSlot;
  
    // Ensure the reservations object structure exists
    if (!table.reservations[date]) {
      table.reservations[date] = {};
    }
    table.reservations[date][time] = true;
  
    // Prepare the reservation data
    const reservationData = {
      tableId: table.id,
      date,
      time,
      customerName: this.reservationData.customerName,
      contact: this.reservationData.contact,
      seats: this.reservationData.seats,
    };
  
    // Send the reservation to the mock server
    this.reservationService.addReservation(reservationData).subscribe(() => {
      alert('Reservation confirmed!');
      this.showReservationForm = false;
      this.filterAvailableTables(); // Refresh available tables
    });
  }
  

  generateTimeSlots() {
    const slots: string[] = [];
    for (let hour = 9; hour <= 23; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return slots;
  }
}
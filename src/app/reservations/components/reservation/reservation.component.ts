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

  reservationData = {
    tableId: 0,
    date: '',
    time: '',
    customerName: '',
    contact: '',
    seats: 1,
  };

  selectedDate: string = '';
  selectedTable: Table | null = null;
  timeSlots: TimeSlot[] = [];
  showReservationForm: boolean = false;
  minDate: string = '';
  maxDate: string = '';
  isDateValid: boolean = false;

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.setDateRange();
  }

  setDateRange() {
    const currentDate = new Date();
    this.minDate = this.formatDate(currentDate);

    const maxDate = new Date();
    maxDate.setDate(currentDate.getDate() + 7); // Allow reservations within the next 7 days
    this.maxDate = this.formatDate(maxDate);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedDate = input.value;

    // Validate the selected date
    this.isDateValid = this.isValidDate(this.selectedDate);

    if (!this.isDateValid) {
      alert('Invalid date selected. Please choose a date within the next 7 days.');
      this.selectedDate = '';
      this.selectedTable = null;
      this.timeSlots = [];
    } else {
      this.selectedTable = null; // Reset selected table
      this.timeSlots = []; // Reset time slots
    }
  }

  isValidDate(date: string): boolean {
    return date >= this.minDate && date <= this.maxDate;
  }

  selectTable(table: Table) {
    if (!this.isDateValid) {
      alert('Please select a valid date first.');
      return;
    }

    this.selectedTable = table;
    this.loadTableAvailability();
  }

  loadTableAvailability() {
    if (!this.selectedTable || !this.selectedDate) return;

    const reservations = this.selectedTable.reservations[this.selectedDate] || {};
    this.timeSlots = this.generateTimeSlots().map((time) => ({
      time,
      isReserved: !!reservations[time],
    }));
  }

  reserveTimeSlot(time: string) {
    if (!this.selectedTable) return;

    this.showReservationForm = true;
    this.reservationData = {
      tableId: this.selectedTable.id,
      date: this.selectedDate,
      time,
      customerName: '',
      contact: '',
      seats: 1,
    };
  }

  submitReservation() {
    if (!this.selectedTable || !this.reservationData.time) return;

    const table = this.selectedTable;
    const date = this.selectedDate;
    const time = this.reservationData.time;

    if (!table.reservations[date]) {
      table.reservations[date] = {};
    }
    table.reservations[date][time] = true;

    this.reservationService.addReservation(this.reservationData).subscribe(() => {
      alert('Reservation confirmed!');
      this.showReservationForm = false;
      this.loadTableAvailability(); // Refresh availability
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

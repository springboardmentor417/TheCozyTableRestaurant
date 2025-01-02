import { Component } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



interface Table {
  id: number;
  name: string;
  isReserved: boolean;
  seats: number;
}

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  tables: Table[] = [];
  reservationData = {
    tableId: '',
    customerName: '',
    contact: '',
    date: '',
    time: '',
    seats: ''
  };
  isInvalidDate: boolean = false;
  isDateOutOfRange: boolean = false;
  isInvalidTime: boolean = false;
  isTimeInPast: boolean = false;


  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.loadTables();
  }

  validateDate(): void {
    const today = new Date();
    const selectedDate = new Date(this.reservationData.date);

    // Reset the time to ensure we only compare dates (ignoring the time part)
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    // Get the date 7 days from today
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(today.getDate() + 7);

    // Check if the selected date is within the range of today and 7 days from now
    if (selectedDate < today || selectedDate > sevenDaysFromNow) {
      this.isInvalidDate = true;
      this.isDateOutOfRange = true;  // Flag to show the error message
    } else {
      this.isInvalidDate = false;
      this.isDateOutOfRange = false;  // Valid date
    }
  }
  validateContact(): boolean {
    const contactPattern = /^[1-9][0-9]{9}$/;
    if (!contactPattern.test(this.reservationData.contact)) {
      alert('Invalid contact number. It must be a 10-digit number and cannot start with 0.');
      return false;
    }
    return true;
  }

  validateTime(): void {
    const selectedTime = new Date(`1970-01-01T${this.reservationData.time}:00`); // Time only (no date)
    const currentDateTime = new Date();
    
    // Reset current time date to make sure we're only comparing times (no date)
    currentDateTime.setFullYear(1970, 0, 1); // Set to a dummy date
    currentDateTime.setSeconds(0, 0); // Ensure comparison is done only by hour and minute
  
    // Restaurant working hours (e.g., 9:00 AM to 11:00 PM)
    const openingTime = new Date('1970-01-01T09:00:00'); // 9:00 AM
    const closingTime = new Date('1970-01-01T23:00:00'); // 11:00 PM
  
    // Check if selected time is within working hours
    if (selectedTime < openingTime || selectedTime > closingTime) {
      this.isInvalidTime = true;  // Time is out of working hours
    } else {
      this.isInvalidTime = false; // Time is within working hours
    }
  
    // Check if selected time is in the past (before current time)
    if (selectedTime <= currentDateTime) {
      this.isTimeInPast = true; // Time is in the past
    } else {
      this.isTimeInPast = false; // Time is not in the past
    }
  }
  
  
  
  
  


  reserveTable(): void {
    // Ensure all required fields are filled and valid
    if (!this.reservationData.tableId || !this.reservationData.customerName ||
      !this.reservationData.contact || !this.reservationData.date ||
      !this.reservationData.time || !this.reservationData.seats) {
      alert('Please fill out all fields correctly before submitting.');
      return;
    }

    if (!this.validateContact()) {
      return;
    }

    // Validate the date before proceeding
    this.validateDate();
    if (this.isInvalidDate) {
      return;
    }

    this.validateTime();
    if (this.isInvalidTime || this.isTimeInPast) {
      return;
    }

    const tableId = Number(this.reservationData.tableId);
    const selectedTable = this.tables.find(table => table.id === tableId);

    if (!selectedTable) {
      alert('Selected table does not exist.');
      return;
    }

    if (selectedTable.isReserved) {
      alert('This table is already reserved. Please choose another table.');
      return;
    }

    this.reservationService.makeReservation(this.reservationData).subscribe(
      () => {
        alert('Reservation Successful!');
        selectedTable.isReserved = true;
        this.updateTableStatus(selectedTable);
      },
      error => {
        console.error('Error making reservation:', error);
        alert('Failed to make reservation. Please try again.');
      }
    );
  }


  updateTableStatus(table: Table): void {
    this.reservationService.updateTable(table.id, table).subscribe(
      () => {
        console.log(`Table ${table.id} status updated to reserved.`);
        this.loadTables();
      },
      error => {
        console.error('Error updating table status:', error);
        // alert('Failed to update table status. Please try again.');
      }
    );
  }

  loadTables(): void {
    this.reservationService.getTables().subscribe(
      (data: Table[]) => {
        this.tables = data;
        console.log('Tables loaded successfully:', this.tables);
      },
      error => {
        console.error('Failed to load tables:', error);
        alert('Unable to load tables. Please check your network or server.');
      }
    );
  }
}
function elseif(arg0: boolean) {
  throw new Error('Function not implemented.');
}


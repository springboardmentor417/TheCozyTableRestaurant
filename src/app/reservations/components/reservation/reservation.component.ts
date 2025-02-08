import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicesService } from '../../../User profile -authentication/services/services.service';
import { Router } from '@angular/router';

interface TimeSlot {
  time: string;
  isReserved: boolean | string | null;
  isDisabled?: boolean;
}

export interface Table {
  id: number;
  seats: number;
  reservations: {
    [date: string]: { [time: string]: 'pending' | 'rejected' | null };
  };
  timeSlots?: TimeSlot[];
}

export interface Reservation {
  id: string;
  userId:number,
  tableId: number;
  customerName: string;
  contact: string;
  date: string;
  time: string;
  seats: number;
  status: 'pending' | 'rejected';
}

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  tables: Table[] = [];
  reservationData = {
    tableId: 0,
    date: '',
    time: '',
    customerName: '',
    contact: '',
    seats: 1,
    status: 'pending',
  };

  selectedDate: string = '';
  selectedTable: Table | null = null;
  timeSlots: TimeSlot[] = [];
  showReservationForm: boolean = false;
  minDate: string = '';
  maxDate: string = '';
  isDateValid: boolean = false;
  showExistingReservations: boolean = false;
  userReservations: Reservation[] = [];
  existingReservations: Reservation[] = [];
  showEditForm: boolean = false;
  selectedReservation: Reservation | null = null;
  maxSeats: number = 1;
  currentUser: any = null;

  constructor(
    private reservationService: ReservationService,
    private servicesService: ServicesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setDateRange();
    this.loadTables();
    this.loadUser();
    this.loadUserReservations();
  }

  navigateToEditPage(reservationId: string): void {
    this.router.navigate(['/edit-reservation', reservationId]);
  }

  loadUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!this.currentUser || !this.currentUser.id) {
      console.error('No logged-in user found.');
    }
  }

  loadTables() {
    this.reservationService.getTables().subscribe(
      (data) => {
        this.tables = data;
      },
      (error) => {
        console.error('Error loading tables:', error);
        alert('Failed to load tables. Please try again later.');
      }
    );
  }

  setDateRange() {
    const currentDate = new Date();
    this.minDate = this.formatDate(currentDate);

    const maxDate = new Date();
    maxDate.setDate(currentDate.getDate() + 7);
    this.maxDate = this.formatDate(maxDate);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  toggleReservationsVisibility() {
    this.showExistingReservations = !this.showExistingReservations;
  }

  onDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedDate = input.value;

    this.isDateValid = this.isValidDate(this.selectedDate);
    if (!this.isDateValid) {
      alert('Invalid date selected. Please choose a date within the next 7 days.');
      this.resetSelection();
    } else {
      this.resetSelection();
    }
  }

  isValidDate(date: string): boolean {
    return date >= this.minDate && date <= this.maxDate;
  }

  resetSelection() {
    this.selectedTable = null;
    this.timeSlots = [];
    this.existingReservations = [];
  }

  validateContact(): boolean {
    const contactPattern = /^[6-9][0-9]{9}$/;
    if (!contactPattern.test(this.reservationData.contact)) {
      alert('Invalid contact number. It must be a 10-digit number and cannot start with 0.');
      return false;
    }
    return true;
  }


  selectTable(table: Table) {
    if (!this.isDateValid) {
      alert('Please select a valid date first.');
      return;
    }

    this.selectedTable = table;
    this.maxSeats = table.seats; 
    this.loadTableAvailability();
    this.loadExistingReservations();
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
      status: 'pending',
    };
  }

  loadTableAvailability() {
    if (!this.selectedTable || !this.selectedDate) return;
    const currentTime = new Date();
    const reservations = this.selectedTable.reservations[this.selectedDate] || {};

    this.timeSlots = this.generateTimeSlots().map((time) => {
      const reservationStatus = reservations[time];
      const isPastTime = this.isPastTime(time, currentTime,this.selectedDate); // Get the reservation status for this time slot
      return {
        time,
        isReserved: reservationStatus && reservationStatus !== 'rejected' ? 'pending' : null,
        isDisabled: isPastTime,  // Set it to "pending" or null, instead of a boolean value
      };
    });
  }

  isPastTime(time: string, currentTime: Date, selectedDate: string): boolean {
    const today = this.formatDate(new Date());

    if (selectedDate > today) return false; // Allow all slots for future dates

    const [timePart, period] = time.split(' ');
    let [hour, minutes] = timePart.split(':').map(Number);

    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;

    const selectedTime = new Date();
    selectedTime.setHours(hour, minutes, 0, 0);

    return selectedTime < currentTime;
  }

  loadExistingReservations() {
    if (!this.selectedTable || !this.selectedDate || !this.currentUser) return;

    this.existingReservations = this.userReservations.filter(
      (reservation) =>
        reservation.tableId === this.selectedTable!.id &&
        reservation.date === this.selectedDate &&
        reservation.userId === this.currentUser.id
    );
  }

  // editReservation(reservation: Reservation) {
  //   this.selectedReservation = { ...reservation };
  //   this.showEditForm = true;
  // }

  // updateReservation() {
  //   if (!this.selectedReservation) return;

  //   this.reservationService.updateReservation(this.selectedReservation).subscribe(
  //     () => {
  //       alert('Reservation updated successfully!');
  //       this.loadUserReservations();
  //       this.loadExistingReservations();
  //       this.showEditForm = false;
  //     },
  //     (error) => {
  //       console.error('Error updating reservation:', error);
  //       alert('Failed to update reservation. Please try again.');
  //       this.showEditForm = false;
  //     }
  //   );
  // }

  deleteReservation(reservationId: string) {
    if (confirm('Are you sure you want to delete this reservation?')) {
      this.reservationService.deleteReservation(reservationId).subscribe(
        () => {
          alert('Reservation deleted successfully!');
  
          // Remove the deleted reservation from userReservations
          this.userReservations = this.userReservations.filter(
            (reservation) => reservation.id !== reservationId
          );
  
          // Remove the deleted reservation from existingReservations
          this.existingReservations = this.existingReservations.filter(
            (reservation) => reservation.id !== reservationId
          );
  
          // Update table reservations dynamically
          this.tables.forEach((table) => {
            Object.keys(table.reservations).forEach((date) => {
              Object.keys(table.reservations[date]).forEach((time) => {
                if (table.reservations[date][time] === 'pending' && 
                    this.existingReservations.every(res => res.date !== date || res.time !== time)) {
                  table.reservations[date][time] = null;
                }
              });
            });
          });
  
          this.loadTableAvailability(); // Refresh available time slots dynamically
        },
        (error) => {
          console.error('Error deleting reservation:', error);
          alert('Failed to delete reservation. Please try again.');
        }
      );
    }
  }
  
  


  submitReservation() {
    // if (!this.selectedTable || !this.reservationData.time) return;
    if (!this.selectedTable || !this.reservationData.customerName ||
      !this.reservationData.contact ||
      !this.reservationData.time || !this.reservationData.seats) {
      alert('Please fill out all fields correctly before submitting.');
      return;
    }

    if (!this.validateContact()) {
      return;
    }

    if (this.reservationData.seats < 1 || this.reservationData.seats > this.maxSeats) {
      alert(`Please select a number of seats between 1 and ${this.maxSeats}.`);
      return;
    }


    const reservation: Reservation = {
      ...this.reservationData,
      id: String(Math.floor(Math.random() * 10000)),
      userId: this.currentUser.id, // Generate string ID, // Generate a smaller random ID
      status: 'pending', // Make sure the status is 'pending'
    };


    this.reservationService.addReservation(reservation).subscribe(
      () => {
        alert('Reservation confirmed!');
        this.showReservationForm = false;

        // Update reservations immediately
        // this.loadUserReservations();
        // this.loadExistingReservations();
        // this.loadTableAvailability();

        this.userReservations.push(reservation);

        if (this.selectedTable && this.selectedDate) {
          this.existingReservations.push(reservation);

          // Update the table's reservation data
          if (!this.selectedTable.reservations[this.selectedDate]) {
            this.selectedTable.reservations[this.selectedDate] = {};
          }
          this.selectedTable.reservations[this.selectedDate][this.reservationData.time] = 'pending';

          // Refresh the table availability
          this.loadTableAvailability();
        }
      },
        (error) => {
          console.error('Error saving reservation:', error);
          alert('Failed to save reservation. Please try again later.');
        }
    );
    // this.loadTableAvailability();
    // this.loadUserReservations();
  }

  loadUserReservations() {
    if (!this.currentUser) return;

    this.reservationService.getUserReservations(this.currentUser.id).subscribe(
      (data) => {
        this.userReservations = data.map((reservation) => ({
          ...reservation,
          status: reservation.status === 'approved' ? 'pending' : reservation.status,
        }));

        this.tables.forEach((table) => {
          table.reservations = {};
          this.userReservations.forEach((reservation) => {
            if (reservation.tableId === table.id) {
              if (!table.reservations[reservation.date]) {
                table.reservations[reservation.date] = {};
              }
              table.reservations[reservation.date][reservation.time] = reservation.status;
            }
          });
        });
      },
      (error) => {
        console.error('Error loading reservations:', error);
        alert('Failed to load reservations. Please try again later.');
      }
    );
  }



  generateTimeSlots() {
    const slots: string[] = [];
    for (let hour = 9; hour <= 23; hour++) {
      const period = hour < 12 ? 'AM' : 'PM';
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12; // Converts 0, 12, 13, etc. to 12-hour format
      slots.push(`${formattedHour.toString().padStart(2, '0')}:00 ${period}`);
    }
    return slots;
  }

}

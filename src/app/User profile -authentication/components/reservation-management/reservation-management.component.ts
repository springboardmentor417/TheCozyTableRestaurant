import { Component } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { Router, RouterModule } from '@angular/router';
import { AdminWelcomeComponent } from "../admin-welcome/admin-welcome.component";

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-reservation-management',
  standalone: true,
  imports: [RouterModule, AdminWelcomeComponent],
  templateUrl: './reservation-management.component.html',
  styleUrl: './reservation-management.component.css'
})
export class ReservationManagementComponent {
 constructor(private service: ServicesService, private router: Router) {}
 
 navigateTo(route: string): void {
   switch (route) {
    case 'approve-reservations': this.router.navigate(['/admin/reservations/approve']); break;
    case 'decline-reservations': this.router.navigate(['/admin/reservations/decline']); break;
   }
  }


// reservations: any[] = [];
// reservationForm: FormGroup;

// constructor(private fb: FormBuilder) {
//   this.reservationForm = this.fb.group({
//     date: ['', Validators.required],
//     time: ['', Validators.required],
//     tableNumber: ['', [Validators.required, Validators.min(1)]],
//     guests: ['', [Validators.required, Validators.min(1)]],
//   });
// }

// ngOnInit(): void {
  // Load existing reservations (could fetch from a service)
//   this.reservations = [
//     { id: 1, date: '2025-01-16', time: '18:00', tableNumber: 5, guests: 4 },
//     { id: 2, date: '2025-01-17', time: '19:00', tableNumber: 3, guests: 2 },
//   ];
// }

// addReservation(): void {
//   if (this.reservationForm.valid) {
//     const newReservation = { ...this.reservationForm.value, id: Date.now() };
//     this.reservations.push(newReservation);
//     this.reservationForm.reset();
//   }
// }

// editReservation(reservation: any): void {
//   this.reservationForm.patchValue(reservation);
// }

// cancelReservation(id: number): void {
//   if (confirm('Are you sure you want to cancel this reservation?')) {
//     this.reservations = this.reservations.filter(res => res.id !== id);
//   }
// }
  
}

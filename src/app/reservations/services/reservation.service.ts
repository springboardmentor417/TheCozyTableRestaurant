import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Table } from '../components/reservation/reservation.component';
import { Router } from '@angular/router';

export interface Reservation {
  id: string;
  tableId: number;
  customerName: string;
  contact: string;
  date: string;
  time: string;
  seats: number;
  status: 'pending' | 'approved' | 'rejected';
}

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, public router: Router) {}

  getTables(): Observable<Table[]> {
    return this.http.get<Table[]>(`${this.apiUrl}/tables`).pipe(catchError(this.handleError));
  }

  getUserReservations(userId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/reservations?userId=${userId}`).pipe(catchError(this.handleError));
  }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/reservations`).pipe(catchError(this.handleError));
  }

  addReservation(reservation: Omit<Reservation, "id">): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiUrl}/reservations`, reservation).pipe(catchError(this.handleError));
  }

  // updateReservation(updatedReservation: Reservation): Observable<Reservation> {
  
  //   return this.http
  //     .put<Reservation>(`${this.apiUrl}/reservations`, updatedReservation)
  //     .pipe(catchError(this.handleError));
  // }

  deleteReservation(reservationId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/reservations/${reservationId}`)
      .pipe(catchError(this.handleError));
  }

  updateReservationStatus(id: string, status: string): Observable<Reservation> {
    return this.http.patch<Reservation>(`${this.apiUrl}/reservations/${id}`, { status });
  }
  
  getReservationById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/reservations/${id}`);
  }
  
  updateReservation(reservation: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/reservations/${reservation.id}`, reservation);
  }
  
  

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}

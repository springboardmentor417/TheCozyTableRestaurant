import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Table } from '../components/reservation/reservation.component';
import { Router } from '@angular/router';

export interface Reservation {
  id: string;
  userId:number;
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
  
  updateTableAvailability(tableData: Table[], tableId: number, date: string, time: string, isReserved: boolean) {
    const updatedTables = tableData.map((table: Table) => {  // Explicitly type 'table' as 'Table'
      if (table.id === tableId) {
        if (!table.reservations[date]) {
          table.reservations[date] = {};
        }
        
        // Assign "pending" if isReserved is true, and "rejected" if false
        table.reservations[date][time] = isReserved ? "pending" : "rejected";  // Change this line
      }
      return table;
    });
  
    // Update the db.json with the new reservation status
    return this.http.put(`${this.apiUrl}/tables`, { tables: updatedTables });
  }
  
  
  

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}

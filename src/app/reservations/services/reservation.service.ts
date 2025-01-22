import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Reservation {
  tableId: number;
  customerName: string;
  contact: string;
  date: string;
  time: string;
  seats: number;
}

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getTables(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tables`);
  }

  // Fetch a specific table by id
  getTableById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/tables/${id}`);
  }


  addReservation(reservation: any): Observable<any> {
    return this.http.post('http://localhost:3000/reservations', reservation);
  }
  

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/reservations`);
  }
}
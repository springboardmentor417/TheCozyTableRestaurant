import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  updateTable(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/tables/${id}`, data);
  }
  
  
  
  getTables(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tables`);
  }

  makeReservation(reservationData: any): Observable<any> {
    console.log('Sending reservation data:', reservationData); // Debugging log
    return this.http.post(`${this.apiUrl}/reservations`, reservationData); // Replace with your actual API endpoint
  }
  
}

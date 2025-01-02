import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private apiUrl = 'http://localhost:3000/users'; // JSON Server API URL

  constructor(private http: HttpClient) {}

  // ✅ Fetch All Users
  getUsers(username: any, password: any): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // ✅ Add a New User
  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  // ✅ Update User Details
  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${user.id}`, user);
  }

  // ✅ Delete a User
  deleteUser(userId: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${userId}`);
  }

  // 🔐 -------- Local Storage Session Functionality -------- 🔐

  // ✅ Save User to Local Storage
  setLocalUser(user: any): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      console.warn('localStorage is not available.');
    }
  }

  // ✅ Retrieve User from Local Storage
  getLocalUser(): any {
    if (this.isLocalStorageAvailable()) {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    } else {
      console.warn('localStorage is not available.');
      return null;
    }
  }

  // ✅ Clear User from Local Storage
  clearLocalUser(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('currentUser');
    } else {
      console.warn('localStorage is not available.');
    }
  }

  // ✅ Check if User is Logged In
  isLoggedIn(): boolean {
    return this.isLocalStorageAvailable() && !!localStorage.getItem('currentUser');
  }

  // ✅ Utility: Check if Local Storage is Available
  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }
}

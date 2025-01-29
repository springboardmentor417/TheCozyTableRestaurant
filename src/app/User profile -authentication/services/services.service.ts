import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private loginStatusSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loginStatusSubject.asObservable();

  setLoginStatus(status: boolean): void {
    this.loginStatusSubject.next(status);
  }

   // Check login status
   getLoginStatus(): boolean {
    return this.loginStatusSubject.value; // Return current value
  }
  logout(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.clear();
    }
    // Update login status to false
    this.setLoginStatus(false);
  }
  
 
  

  private apiUrl = 'http://localhost:3000/users'; // Corrected base URL to point to '/users'

  constructor(private http: HttpClient) {}

  // ✅ Fetch All Users
  getUsers(username: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users) => users.find((user) => user.username === username && user.password === password))
    );
  }
  

  // ✅ Add a New User
  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user); // Adds a user to the 'users' array in db.json
  }

  // ✅ Update User Details
  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${user.id}`, user); // Updates user by ID
  }

  // ✅ Delete a User
  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${userId}`); // Deletes user by ID
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

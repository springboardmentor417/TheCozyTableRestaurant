
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private loginStatusSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loginStatusSubject.asObservable();

  private apiUrl = 'http://localhost:3000/users'; // Base URL for users API

  constructor(private http: HttpClient,private router:Router) {
    const currentUser = this.getLocalUser();
    this.loginStatusSubject.next(!!currentUser);
  }

  // ----------- Login Management ----------- //

  setLoginStatus(status: boolean): void {
    this.loginStatusSubject.next(status);
  }

  getLoginStatus(): boolean {
    return this.loginStatusSubject.value;
  }

  logout(): void {
    this.clearLocalUser();
    this.setLoginStatus(false);
    this.router. navigate(['/login']).then(() => {
      window.location.reload(); 
    });
  }
  

  // ----------- User Management ----------- //
  getUsers(username?: string, password?: string): Observable<any[]> {
    // if (username && password) {
    //   return this.http.get<any[]>(this.apiUrl).pipe(
    //     map((users) =>
    //       users.filter((user) => user.username === username && user.password === password)
    //     )
    //   );
    // }
    // If no username and password are provided, return all users
    return this.http.get<any[]>(this.apiUrl);
  }
  

  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user).pipe(
      catchError((error) => {
        console.error('Error adding user:', error);
        return throwError(() => new Error('Failed to add user'));
      })
    );
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${user.id}`, user).pipe(
      catchError((error) => {
        console.error('Error updating user:', error);
        return throwError(() => new Error('Failed to update user'));
      })
    );
  }
  
  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`).pipe(
      catchError((error) => {
        console.error('Error fetching user by ID:', error);
        return throwError(() => new Error('Failed to fetch user details'));
      })
    );
  }
  


  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${userId}`).pipe(
      catchError((error) => {
        console.error('Error deleting user:', error);
        return throwError(() => new Error('Failed to delete user'));
      })
    );
  }

  getUsersByUsername(username: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users) => users.find((user) => user.username === username)),
      catchError((error) => {
        console.error('Error fetching user by username:', error);
        return throwError(() => new Error('Failed to fetch user'));
      })
    );
  }
  
  userExists(userId: string): Observable<boolean> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`).pipe(
      map((user) => !!user),
      catchError(() => of(false))
    );
  }

  // ----------- Local Storage Utilities ----------- //

  setLocalUser(user: any): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  getLocalUser(): any {
    if (this.isLocalStorageAvailable()) {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  clearLocalUser(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('currentUser');
    }
  }

  isLoggedIn(): boolean {
    return this.isLocalStorageAvailable() && !!localStorage.getItem('currentUser');
  }

  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }
}

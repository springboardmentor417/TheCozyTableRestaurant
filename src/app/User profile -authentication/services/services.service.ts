import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private apiUrl = 'http://localhost:3000/users';

  loggedin: false | undefined;

  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }


  constructor(private http: HttpClient) {}

  getUsers(username: any, password: any, email: any): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  updateUser(user: any): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/${user.id}`, user);

  }
  deleteUser(user: any): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${user.id}`,user);
  }

  //----------Local Storage Session Functionality---------------//

  setLocalUser(user: any): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      console.warn('localStorage is not available.');
    }
  }

  getLocalUser(): any {
    if (this.isLocalStorageAvailable()) {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    } else {
      console.warn('localStorage is not available.');
      return null;
    }
  }

  clearLocalUser(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('currentUser');
    } else {
      console.warn('localStorage is not available.');
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }
}

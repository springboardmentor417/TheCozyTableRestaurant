import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private apiUrl = 'http://localhost:3000/users';
  loggedin: false | undefined;

  constructor(private http: HttpClient) {}

  getUsers(username: any, password: any): Observable<any[]> {
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
}

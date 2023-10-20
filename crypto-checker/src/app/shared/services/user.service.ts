import { Injectable } from '@angular/core';
import { UserData } from '../interfaces/user-data.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  // Method to add a new user
  addUser(userData: UserData): Observable<UserData> {
    return this.http.post<UserData>(this.apiUrl, userData);
  }

  // Method to get the list of registered users
  getRegisteredUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>(this.apiUrl);
  }

  // deleteUser(user: UserData) {
  //   const index = this.registeredUsers.findIndex((u) => u.id === user.id);
  //   if (index !== -1) {
  //     this.registeredUsers.splice(index, 1);
  //     console.log('User removed from registeredUsers array:', user);
  //   }
  // }
}

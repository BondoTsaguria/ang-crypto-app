import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserData } from '../interfaces/user-data.interface';
import { Observable, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  private baseUrl = 'http://localhost:3000/loggedInUsers';
  constructor(private http: HttpClient) {}

  deposit(userId: number, depositAmount: number): Observable<UserData> {
    const url = `${this.baseUrl}/${userId}`;

    return this.http.get<UserData>(url).pipe(
      mergeMap((user) => {
        const newBalance = user.balance! + depositAmount;
        const balanceUpdate = { balance: newBalance };

        return this.http.patch<UserData>(url, balanceUpdate);
      })
    );
  }

  updateUserBalance(userId: number, newBalance: number): Observable<UserData> {
    const userUrl = `${this.baseUrl}/${userId}`;
    const balanceUpdate = { balance: newBalance };

    return this.http.patch<UserData>(userUrl, balanceUpdate);
  }
}

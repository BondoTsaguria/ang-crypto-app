import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserData } from '../interfaces/user-data.interface';
import { Observable, mergeMap } from 'rxjs';
import { ownedCryptoes } from '../interfaces/owned-cryptoes.interface';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  private baseUrl = 'http://localhost:3000/loggedInUsers';
  constructor(private http: HttpClient) {}

  //Update balance after deposit
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

  //Update balance
  updateUserBalance(userId: number, newBalance: number): Observable<UserData> {
    const userUrl = `${this.baseUrl}/${userId}`;
    const balanceUpdate = { balance: newBalance };

    return this.http.patch<UserData>(userUrl, balanceUpdate);
  }

  //Update bought/sold coins record
  updateCryptocurrenciesRecord(
    userId: number,
    updatedList: ownedCryptoes[]
  ): Observable<UserData> {
    const userUrl = `${this.baseUrl}/${userId}`;
    const updatedCurrencies = { cryptocurrencies: updatedList };

    return this.http.patch<UserData>(userUrl, updatedCurrencies);
  }

  //Update coin list
  updateMycurrenciesList(
    inputData: ownedCryptoes[],
    userId: number
  ): Observable<UserData> {
    const userUrl = `${this.baseUrl}/${userId}`;
    const updatedCurrencies = { mycurrencies: inputData };
    return this.http.patch<UserData>(userUrl, updatedCurrencies);
  }
}

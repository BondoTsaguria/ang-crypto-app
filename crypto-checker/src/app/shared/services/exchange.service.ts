import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  private balanceSubject = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient, private authService: AuthService) {}

  deposit(amount: number) {
    const currentBalance = this.balanceSubject.value;
    const newBalance = currentBalance + amount;
    this.balanceSubject.next(newBalance);
  }

  getBalance(): Observable<number> {
    return this.balanceSubject.asObservable();
  }
}

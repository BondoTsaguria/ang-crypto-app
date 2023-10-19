import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  constructor() {}

  setLoggedIn(value: boolean) {
    this.isLoggedInSubject.next(value);
    localStorage.setItem('isLoggedIn', value ? 'true' : 'false');
  }
  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }
}

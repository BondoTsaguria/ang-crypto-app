import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  private currentUserIdSubject = new BehaviorSubject<number | null>(
    // Retrieve the current user's ID from localStorage
    localStorage.getItem('currentUserId')
      ? parseInt(localStorage.getItem('currentUserId')!, 10)
      : null
  );

  constructor() {}

  setLoggedIn(value: boolean) {
    this.isLoggedInSubject.next(value);
    localStorage.setItem('isLoggedIn', value ? 'true' : 'false');
  }
  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  setCurrentUserId(userId: number | null) {
    this.currentUserIdSubject.next(userId);
    // Store the current user's ID in localStorage
    if (userId !== null) {
      localStorage.setItem('currentUserId', userId.toString());
    } else {
      localStorage.removeItem('currentUserId');
    }
  }

  getCurrentUserId(): number | null {
    return this.currentUserIdSubject.value;
  }
}

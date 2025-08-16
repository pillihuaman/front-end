// src/app/@data/services/auth-state.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  private loggedIn = new BehaviorSubject<boolean>(false); // valor inicial false
  private loggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();
  private isLoggedOut$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {}
  
  setLoginState(state: boolean): void {
    this.loggedIn.next(state);
  }

  setLoggedIn(status: boolean): void {
    this.loggedIn$.next(status);
  }
  // auth-manager.service.ts
  waitForToken(maxWait = 3000): Promise<string | null> {
    return new Promise((resolve) => {
      const existingToken = localStorage.getItem('token');
      if (existingToken) return resolve(existingToken);

      const interval = setInterval(() => {
        const token = localStorage.getItem('token');
        if (token) {
          clearInterval(interval);
          resolve(token);
        }
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        resolve(null); // No se encontró token
      }, maxWait);
    });
  }

  get loggedOut$(): Observable<boolean> {
    return this.isLoggedOut$.asObservable();
  }

  logout(reason?: string) {
    localStorage.removeItem('token');
    this.isLoggedOut$.next(true);
  }
  triggerLogout(): void {
    localStorage.removeItem('token');
    this.setLoggedIn(false);
    this.router.navigate(['/auth/login']);
  }

}

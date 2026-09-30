import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_TOKEN_KEY } from '../constants/auth.constants';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);

  private readonly _token = signal<string | null>(this.getStoredToken());

  /** Readonly signal holding the current authentication token */
  readonly token = this._token.asReadonly();

  /** Reactive boolean signal indicating whether the user is logged in */
  readonly isAuthenticated = computed(() => !!this._token());

  /** Retrieves the active auth token */
  getToken(): string | null {
    return this._token();
  }

  /** Persists token to sessionStorage and updates reactive state */
  saveToken(token: string): void {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(AUTH_TOKEN_KEY, token);
    }
    this._token.set(token);
  }

  /** Clears token from storage and resets reactive state */
  clearSession(): void {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem(AUTH_TOKEN_KEY);
    }
    this._token.set(null);
  }

  /** Logs out user, clears session, and redirects to login */
  logout(): void {
    this.clearSession();
    void this.router.navigate(['/auth/login']);
  }

  private getStoredToken(): string | null {
    if (typeof sessionStorage === 'undefined') {
      return null;
    }
    return sessionStorage.getItem(AUTH_TOKEN_KEY);
  }
}

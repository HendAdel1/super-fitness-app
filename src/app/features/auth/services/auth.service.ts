import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import type { ApiErrorBody, SignInRequest, SignInResponse } from '../models/auth.models';

const TOKEN_STORAGE_KEY = 'super_fitness_auth_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  signIn(credentials: SignInRequest): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(`${environment.apiBaseUrl}/auth/signin`, credentials);
  }

  saveToken(token: string): void {
    if (typeof sessionStorage === 'undefined') {
      return;
    }
    sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
  }

  readSignInError(body: unknown): string {
    if (body && typeof body === 'object' && 'error' in body) {
      const message = (body as ApiErrorBody).error;
      if (typeof message === 'string') {
        return message;
      }
    }
    return 'Something went wrong';
  }

  resolveToken(response: SignInResponse): string | null {
    return response.token ?? response.accessToken ?? null;
  }
}

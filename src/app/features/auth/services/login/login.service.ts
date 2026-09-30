import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../../core/services/auth.service';
import type { ApiErrorBody } from '../../models/shared/api-error.model';
import type { LoginRequest, LoginResponse } from '../../models/login/login.models';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/auth/signin`, credentials);
  }

  saveToken(token: string): void {
    this.authService.saveToken(token);
  }

  readLoginError(body: unknown): string {
    if (body && typeof body === 'object' && 'error' in body) {
      const message = (body as ApiErrorBody).error;
      if (typeof message === 'string') {
        return message;
      }
    }
    return 'Something went wrong';
  }

  resolveToken(response: LoginResponse): string | null {
    return response.token ?? response.accessToken ?? null;
  }
}

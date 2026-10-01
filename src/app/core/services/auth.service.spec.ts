import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AUTH_TOKEN_KEY } from '../constants/auth.constants';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let router: { navigate: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    sessionStorage.clear();
    router = {
      navigate: vi.fn().mockResolvedValue(true),
    };

    TestBed.configureTestingModule({
      providers: [AuthService, { provide: Router, useValue: router }],
    });

    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should initialize with no token when sessionStorage is empty', () => {
    expect(service.getToken()).toBeNull();
    expect(service.token()).toBeNull();
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should save token to sessionStorage and update signals', () => {
    const dummyToken = 'test-jwt-token-123';
    service.saveToken(dummyToken);

    expect(sessionStorage.getItem(AUTH_TOKEN_KEY)).toBe(dummyToken);
    expect(service.getToken()).toBe(dummyToken);
    expect(service.token()).toBe(dummyToken);
    expect(service.isAuthenticated()).toBe(true);
  });

  it('should clear session and reset signals', () => {
    service.saveToken('token-to-clear');
    expect(service.isAuthenticated()).toBe(true);

    service.clearSession();
    expect(sessionStorage.getItem(AUTH_TOKEN_KEY)).toBeNull();
    expect(service.getToken()).toBeNull();
    expect(service.token()).toBeNull();
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should logout by clearing session and navigating to /auth/login', () => {
    service.saveToken('token-to-logout');
    service.logout();

    expect(service.getToken()).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
  });
});

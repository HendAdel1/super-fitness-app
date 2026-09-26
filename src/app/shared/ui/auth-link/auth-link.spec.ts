import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthLink } from './auth-link';

describe('AuthLink', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthLink],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders login footer link to register', () => {
    const fixture = TestBed.createComponent(AuthLink);
    fixture.componentRef.setInput('variant', 'login-register');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('.auth-link__lead')?.textContent).toContain('Dont Have An Account Yet');
    expect(el.querySelector('.auth-link__action')?.textContent?.trim()).toBe('Register');
    expect(el.querySelector('a.auth-link__action')?.getAttribute('href')).toContain('/auth/register');
  });

  it('renders register footer link to login', () => {
    const fixture = TestBed.createComponent(AuthLink);
    fixture.componentRef.setInput('variant', 'register-login');
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('a.auth-link__action')?.textContent?.trim()).toBe('Login');
  });

  it('emits action for otp resend', () => {
    const fixture = TestBed.createComponent(AuthLink);
    fixture.componentRef.setInput('variant', 'otp-resend');
    fixture.detectChanges();

    let emitted = false;
    fixture.componentInstance.action.subscribe(() => (emitted = true));
    (fixture.nativeElement.querySelector('.auth-link__action') as HTMLButtonElement).click();

    expect(emitted).toBe(true);
  });

  it('renders forgot password inline link', () => {
    const fixture = TestBed.createComponent(AuthLink);
    fixture.componentRef.setInput('variant', 'forgot-password');
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.auth-link')?.classList.contains('text-end')).toBe(true);
    expect(el.querySelector('a')?.textContent?.trim()).toBe('Forget Password ?');
  });
});

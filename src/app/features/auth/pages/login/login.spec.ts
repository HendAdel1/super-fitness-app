import { TestBed } from '@angular/core/testing';
import { Login } from './login';

describe('Login', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Login);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('TEMP: renders all auth-heading cases for visual QA', () => {
    const fixture = TestBed.createComponent(Login);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('.auth-heading__lead')?.textContent?.trim()).toBe('Hey There');
    expect(el.querySelector('.auth-heading__headline')?.textContent?.trim()).toBe('WELCOME BACK');
  });
});

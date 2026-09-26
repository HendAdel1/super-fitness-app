import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthLayout } from './auth-layout';

describe('AuthLayout', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthLayout],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AuthLayout);
    expect(fixture.componentInstance).toBeTruthy();
  });
});

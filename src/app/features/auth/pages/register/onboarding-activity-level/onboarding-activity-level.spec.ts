import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { signal, WritableSignal } from '@angular/core';
import { vi } from 'vitest';
import { OnboardingActivityLevel } from './onboarding-activity-level';
import { RegisterService } from '../../../services/register/register.service';
import { SignupDraft } from '../../../models/register/register.models';
import { AuthButton } from '../../../../../shared/ui/auth-button/auth-button';

interface MockRegisterService {
  updateDraft: ReturnType<typeof vi.fn>;
  draftData: WritableSignal<SignupDraft>;
}

interface MockRouter {
  navigateByUrl: ReturnType<typeof vi.fn>;
}

describe('OnboardingActivityLevel', () => {
  let component: OnboardingActivityLevel;
  let fixture: ComponentFixture<OnboardingActivityLevel>;
  let mockRegisterService: MockRegisterService;
  let mockRouter: MockRouter;
  let mockDraftData: WritableSignal<SignupDraft>;

  beforeEach(async () => {
    mockDraftData = signal<SignupDraft>({});
    mockRegisterService = {
      updateDraft: vi.fn(),
      draftData: mockDraftData,
    };
    mockRouter = {
      navigateByUrl: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [OnboardingActivityLevel],
      providers: [
        { provide: RegisterService, useValue: mockRegisterService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingActivityLevel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 5 activity level options matching Figma design', () => {
    expect(component.activityLevels).toHaveLength(5);
    expect(component.activityLevels.map((opt) => opt.label)).toEqual([
      'Rookie',
      'Beginner',
      'Intermediate',
      'Advance',
      'True Beast',
    ]);
  });

  it('should initialize activityLevel as undefined if draft is empty', () => {
    expect(component.activityLevel()).toBeUndefined();
  });

  it('should initialize activityLevel from draft data if present', () => {
    mockDraftData.set({ activityLevel: 'Intermediate' });

    fixture = TestBed.createComponent(OnboardingActivityLevel);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.activityLevel()).toBe('Intermediate');
  });

  it('should pass disabled=true to Next button when activityLevel is undefined', () => {
    const button = fixture.debugElement.query(By.directive(AuthButton));
    expect(button.componentInstance.disabled()).toBe(true);
  });

  it('should pass disabled=false to Next button when activityLevel is selected', () => {
    component.activityLevel.set('Advance');
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.directive(AuthButton));
    expect(button.componentInstance.disabled()).toBe(false);
  });

  it('should update draft on onNext()', () => {
    component.activityLevel.set('True Beast');
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.directive(AuthButton));
    button.componentInstance.clicked.emit();

    expect(mockRegisterService.updateDraft).toHaveBeenCalledWith({ activityLevel: 'True Beast' });
  });
});

import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHeading } from '../../../../../shared/ui/auth-heading/auth-heading';
import { AuthButton } from '../../../../../shared/ui/auth-button/auth-button';
import { AuthRadioButton, RadioOption } from '../../../../../shared/ui/auth-radio-button/auth-radio-button';
import { RegisterService } from '../../../services/register/register.service';

@Component({
  selector: 'app-onboarding-goal',
  imports: [AuthHeading, AuthButton, AuthRadioButton],
  templateUrl: './onboarding-goal.html',
  styleUrl: './onboarding-goal.scss',
})
export class OnboardingGoal {
  private readonly registerService = inject(RegisterService);
  private readonly router = inject(Router);

  readonly goal = signal<string | undefined>(this.registerService.draftData().goal);

  readonly goals: RadioOption<string>[] = [
    { id: '1', label: 'Gain Weight', value: 'Gain Weight' },
    { id: '2', label: 'Lose Weight', value: 'Lose Weight' },
    { id: '3', label: 'Get Fitter', value: 'Get Fitter' },
    { id: '4', label: 'Gain More Flexible', value: 'Gain More Flexible' },
    { id: '5', label: 'Learn The Basic', value: 'Learn The Basic' },
  ];

  protected onNext(): void {
    this.registerService.updateDraft({ goal: this.goal() });
    void this.router.navigateByUrl('/auth/register/activity-level');
  }
}


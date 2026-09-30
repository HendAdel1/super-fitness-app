import { Component, signal } from '@angular/core';
import { AuthHeading } from '../../../../../shared/ui/auth-heading/auth-heading';
import { AuthButton } from '../../../../../shared/ui/auth-button/auth-button';
import { AuthRadioButton, RadioOption } from '../../../../../shared/ui/auth-radio-button/auth-radio-button';

@Component({
  selector: 'app-onboarding-goal',
  imports: [AuthHeading, AuthButton, AuthRadioButton],
  templateUrl: './onboarding-goal.html',
  styleUrl: './onboarding-goal.scss',
})
export class OnboardingGoal {
  goal = signal<string>('lose-weight');

  goals: RadioOption<string>[] = [
    { id: '1', label: 'Gain Weight', value: 'gain-weight' },
    { id: '2', label: 'Lose Weight', value: 'lose-weight' },
    { id: '3', label: 'Get Fitter', value: 'get-fitter' },
    { id: '4', label: 'Gain More Flexible', value: 'gain-more-flexible' },
    { id: '5', label: 'Learn The Basic', value: 'learn-the-basic' },
  ];

  onNext(): void {
    // Proceed to next step
  }
}

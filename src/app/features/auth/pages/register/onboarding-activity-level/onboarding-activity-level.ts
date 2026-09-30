import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthButton } from '../../../../../shared/ui/auth-button/auth-button';
import { AuthHeading } from '../../../../../shared/ui/auth-heading/auth-heading';
import { AuthRadioButton, RadioOption } from '../../../../../shared/ui/auth-radio-button/auth-radio-button';
import { RegisterService } from '../../../services/register/register.service';

@Component({
  selector: 'app-onboarding-activity-level',
  host: { class: 'block w-full max-w-[486px]' },
  imports: [AuthHeading, AuthButton, AuthRadioButton],
  templateUrl: './onboarding-activity-level.html',
  styleUrl: './onboarding-activity-level.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingActivityLevel {
  private readonly registerService = inject(RegisterService);
  private readonly router = inject(Router);

  readonly activityLevel = signal<string | undefined>(this.registerService.draftData().activityLevel);

  readonly activityLevels: RadioOption<string>[] = [
    { id: '1', label: 'Rookie', value: 'Rookie' },
    { id: '2', label: 'Beginner', value: 'Beginner' },
    { id: '3', label: 'Intermediate', value: 'Intermediate' },
    { id: '4', label: 'Advance', value: 'Advance' },
    { id: '5', label: 'True Beast', value: 'True Beast' },
  ];

  protected onNext(): void {
    this.registerService.updateDraft({ activityLevel: this.activityLevel() });
  }
}

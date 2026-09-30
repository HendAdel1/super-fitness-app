import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthButton } from '../../../../../shared/ui/auth-button/auth-button';
import { AuthError } from '../../../../../shared/ui/auth-error/auth-error';
import { AuthHeading } from '../../../../../shared/ui/auth-heading/auth-heading';
import { AuthRadioButton, RadioOption } from '../../../../../shared/ui/auth-radio-button/auth-radio-button';
import { RegisterService } from '../../../services/register/register.service';

@Component({
  selector: 'app-onboarding-activity-level',
  host: { class: 'block w-full max-w-[486px]' },
  imports: [AuthHeading, AuthButton, AuthRadioButton, AuthError],
  templateUrl: './onboarding-activity-level.html',
  styleUrl: './onboarding-activity-level.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingActivityLevel {
  private readonly registerService = inject(RegisterService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly activityLevel = signal<string | undefined>(this.registerService.draftData().activityLevel);
  readonly isSubmitting = signal(false);
  readonly errorMessage = signal<string | undefined>(undefined);

  readonly activityLevels: RadioOption<string>[] = [
    { id: '1', label: 'Rookie', value: 'level1' },
    { id: '2', label: 'Beginner', value: 'level2' },
    { id: '3', label: 'Intermediate', value: 'level3' },
    { id: '4', label: 'Advance', value: 'level4' },
    { id: '5', label: 'True Beast', value: 'level5' },
  ];

  protected onNext(): void {
    this.registerService.updateDraft({ activityLevel: this.activityLevel() });
    this.isSubmitting.set(true);
    this.errorMessage.set(undefined);

    const draft = this.registerService.draftData();
    this.registerService
      .signup(draft)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.registerService.saveToken(response.token);
          this.registerService.clearDraft();
          void this.router.navigateByUrl('/home');
        },
        error: (err: HttpErrorResponse) => {
          this.isSubmitting.set(false);
          this.errorMessage.set(this.registerService.readRegisterError(err.error));
        },
      });
  }
}

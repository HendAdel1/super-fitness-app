import { Injectable, signal } from '@angular/core';

export const REGISTRATION_STEPS = ['account', 'profile', 'goals'] as const;

export type RegistrationStep = (typeof REGISTRATION_STEPS)[number];

@Injectable({ providedIn: 'root' })
export class RegistrationProgress {
  private readonly completed = signal<ReadonlySet<RegistrationStep>>(new Set());

  canOpen(step: RegistrationStep): boolean {
    const index = REGISTRATION_STEPS.indexOf(step);
    return REGISTRATION_STEPS.slice(0, index).every((previous) => this.completed().has(previous));
  }

  complete(step: RegistrationStep): void {
    this.completed.update((current) => new Set(current).add(step));
  }

  nextOpenStep(): RegistrationStep {
    return REGISTRATION_STEPS.find((step) => !this.completed().has(step)) ?? 'goals';
  }
}

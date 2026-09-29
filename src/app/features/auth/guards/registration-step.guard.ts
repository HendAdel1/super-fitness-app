import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {
  RegistrationProgress,
  RegistrationStep,
} from '../services/registration-progress.service';

export const registrationStepGuard: CanActivateFn = (route) => {
  const step = route.data['step'] as RegistrationStep;
  const progress = inject(RegistrationProgress);

  if (progress.canOpen(step)) {
    return true;
  }

  return inject(Router).createUrlTree(['/auth/register', progress.nextOpenStep()]);
};

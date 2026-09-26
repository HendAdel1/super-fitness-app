import { Component, model } from '@angular/core';
import { AuthButton } from '../../../../../shared/ui/auth-button/auth-button';
import { AuthHeading } from '../../../../../shared/ui/auth-heading/auth-heading';
import { AuthNumberPicker } from '../../../../../shared/ui/auth-number-picker/auth-number-picker';

@Component({
  selector: 'app-register-age',
  imports: [AuthHeading, AuthNumberPicker, AuthButton],
  templateUrl: './age.html',
  styleUrl: './age.scss',
})
export class RegisterAge {
  readonly age = model(25);

  protected onNext(): void {
    // Next registration step will be wired when the flow is built.
  }
}

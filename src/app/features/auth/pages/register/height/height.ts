import { Component, model } from '@angular/core';
import { AuthButton } from '../../../../../shared/ui/auth-button/auth-button';
import { AuthHeading } from '../../../../../shared/ui/auth-heading/auth-heading';
import { AuthNumberPicker } from '../../../../../shared/ui/auth-number-picker/auth-number-picker';

@Component({
  selector: 'app-height',
  imports: [AuthHeading, AuthNumberPicker, AuthButton],
  templateUrl: './height.html',
  styleUrl: './height.scss',
})
export class Height {
    readonly height = model(167);

  protected onNext(): void {
    // Next registration step will be wired when the flow is built.
  }
}

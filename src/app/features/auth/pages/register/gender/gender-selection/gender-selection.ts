import { Component } from '@angular/core';
import { AuthButton } from '../../../../../../shared/ui/auth-button/auth-button';
import { AuthHeading } from '../../../../../../shared/ui/auth-heading/auth-heading';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gender-selection',
  imports: [AuthHeading, AuthButton,CommonModule],
  templateUrl: './gender-selection.html',
  styleUrl: './gender-selection.scss',
})
export class GenderSelection {
  selectedGender: 'male' | 'female' | null = null;

  selectGender(gender: 'male' | 'female'): void {
    this.selectedGender = gender;
  }
    protected onNext(): void {
    // Next registration step will be wired when the flow is built.
  }
}

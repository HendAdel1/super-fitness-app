import { Component, computed, input, output } from '@angular/core';
import { AUTH_BUTTON_CONFIG, type AuthButtonKind } from '../../utils/auth-button.config';

/**
 * Auth form CTA. Always enabled — run validation in the parent `(clicked)` / submit handler.
 *
 * - Register / login / OTP: single `kind` button.
 * - Onboarding steps: `previous` (secondary) + `next` (primary) in `flex gap-4` with each in `flex-1` wrapper.
 */
@Component({
  selector: 'app-auth-button',
  host: { class: 'block w-full' },
  templateUrl: './auth-button.html',
  styleUrl: './auth-button.scss',
})
export class AuthButton {
  readonly kind = input.required<AuthButtonKind>();
  /** Overrides config label (e.g. i18n or A/B copy). */
  readonly label = input<string>();
  readonly type = input<'button' | 'submit'>('button');
  readonly fullWidth = input(true);

  readonly clicked = output<void>();

  protected readonly config = computed(() => AUTH_BUTTON_CONFIG[this.kind()]);
  protected readonly displayLabel = computed(() => this.label() ?? this.config().label);
  protected readonly tone = computed(() => this.config().tone);
}

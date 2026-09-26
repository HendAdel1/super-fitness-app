import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AUTH_LINK_CONFIG, type AuthLinkVariant } from '../../utils/auth-link.config';

@Component({
  selector: 'app-auth-link',
  imports: [RouterLink],
  templateUrl: './auth-link.html',
  styleUrl: './auth-link.scss',
})
export class AuthLink {
  readonly variant = input.required<AuthLinkVariant>();
  readonly action = output<void>();

  protected readonly config = computed(() => AUTH_LINK_CONFIG[this.variant()]);
}

import { Component, input } from '@angular/core';

@Component({
  selector: 'app-auth-or-divider',
  templateUrl: './auth-or-divider.html',
  styleUrl: './auth-or-divider.scss',
})
export class AuthOrDivider {
  readonly label = input('Or');
}

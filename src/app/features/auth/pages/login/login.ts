import { Component } from '@angular/core';
import { AuthHeading } from '../../../../shared/ui/auth-heading/auth-heading';

/** TEMP: AuthHeading on template for visual QA — remove after testing. */
@Component({
  selector: 'app-login',
  imports: [AuthHeading],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {}

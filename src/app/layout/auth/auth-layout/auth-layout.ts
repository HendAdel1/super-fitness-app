import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthAside } from '../auth-aside/auth-aside';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, AuthAside],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
})
export class AuthLayout {}

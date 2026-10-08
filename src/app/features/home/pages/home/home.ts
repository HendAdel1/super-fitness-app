import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { LanguageSwitcher } from '../../../../shared/components/language-switcher/language-switcher';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Hero, LanguageSwitcher],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}

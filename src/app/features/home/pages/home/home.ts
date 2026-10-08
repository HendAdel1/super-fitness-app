import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navbar } from '../../../../layout/main/navbar/navbar';
import { Hero } from '../../components/hero/hero';
import { LanguageSwitcher } from '../../../../shared/components/language-switcher/language-switcher';
import { MarqueeBanner } from '../../../../shared/components/marquee-banner/marquee-banner';
import { HealthyNutrition } from '../../components/healthy-nutrition/healthy-nutrition';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Navbar, Hero, LanguageSwitcher, MarqueeBanner, HealthyNutrition],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}

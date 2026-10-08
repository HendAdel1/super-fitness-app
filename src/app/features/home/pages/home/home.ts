import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navbar } from '../../../../layout/main/navbar/navbar';
import { Hero } from '../../components/hero/hero';
import { LanguageSwitcher } from '../../../../shared/components/language-switcher/language-switcher';
import { MarqueeBanner } from '../../../../shared/components/marquee-banner/marquee-banner';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Navbar, Hero, LanguageSwitcher, MarqueeBanner, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}

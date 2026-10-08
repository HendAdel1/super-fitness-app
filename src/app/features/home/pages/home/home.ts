import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navbar } from '../../../../layout/main/navbar/navbar';
import { LanguageSwitcher } from '../../../../shared/components/language-switcher/language-switcher';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { MarqueeBanner } from '../../../../shared/components/marquee-banner/marquee-banner';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Navbar, LanguageSwitcher, MarqueeBanner, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}

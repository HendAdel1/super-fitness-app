import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LanguageSwitcher } from '../../../../shared/components/language-switcher/language-switcher';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { MarqueeBanner } from '../../../../shared/components/marquee-banner/marquee-banner';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LanguageSwitcher, MarqueeBanner, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}

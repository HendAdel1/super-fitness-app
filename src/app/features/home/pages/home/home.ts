import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LanguageSwitcher } from '../../../../shared/components/language-switcher/language-switcher';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LanguageSwitcher, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}

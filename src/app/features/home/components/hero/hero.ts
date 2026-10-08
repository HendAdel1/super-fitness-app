import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowUpRight } from '@lucide/angular';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

export interface HeroStat {
  readonly valueKey: string;
  readonly labelKey: string;
}

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TranslatePipe, LucideArrowUpRight],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  /** Event emitted when floating chatbot button is clicked */
  readonly chatbotClicked = output<void>();

  /** Key fitness statistics displayed in hero */
  readonly stats: readonly HeroStat[] = [
    {
      valueKey: 'HERO.MEMBERS_COUNT',
      labelKey: 'HERO.MEMBERS_LABEL',
    },
    {
      valueKey: 'HERO.TRAINERS_COUNT',
      labelKey: 'HERO.TRAINERS_LABEL',
    },
    {
      valueKey: 'HERO.EXPERIENCE_COUNT',
      labelKey: 'HERO.EXPERIENCE_LABEL',
    },
  ];

  /** Handles chatbot interaction */
  onChatbotClick(): void {
    this.chatbotClicked.emit();
  }
}

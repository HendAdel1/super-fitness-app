import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  input,
  output,
} from '@angular/core';
import { Router } from '@angular/router';
import { LucideArrowRight } from '@lucide/angular';
import { TranslatePipe } from '../../pipes/translate.pipe';

/**
 * Reusable Meal/Nutrition card component with image, frosted glass bottom panel,
 * uppercase title, and interactive Read More action with orange arrow button.
 * Supports dark/light modes and RTL.
 */
@Component({
  selector: 'app-meal-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, LucideArrowRight],
  templateUrl: './meal-card.html',
  styleUrl: './meal-card.scss',
  host: {
    class: 'block w-full',
  },
})
export class MealCard {
  private readonly router = inject(Router, { optional: true });

  /** Meal title or i18n translation key (e.g. 'MEAL_CARD.BREAKFAST' or 'BREAKFAST') */
  readonly title = input.required<string>();

  /** Image asset path or URL (e.g. 'images/healthy-1.webp') */
  readonly image = input.required<string>();

  /** Optional accessible image alt text. Defaults to title if omitted. */
  readonly alt = input<string>('');

  /** CTA action label or i18n key. Defaults to 'MEAL_CARD.READ_MORE'. */
  readonly ctaLabel = input<string>('MEAL_CARD.READ_MORE');

  /** Optional router link path to navigate on click. */
  readonly actionUrl = input<string | null>(null);

  /** Emitted when the card or CTA is clicked or activated via keyboard. */
  readonly cardClick = output<void>();

  protected onCardClick(): void {
    this.cardClick.emit();
    const url = this.actionUrl();
    if (url && this.router) {
      void this.router.navigateByUrl(url);
    }
  }

  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  protected onKeyDown(event: Event): void {
    event.preventDefault();
    this.onCardClick();
  }
}

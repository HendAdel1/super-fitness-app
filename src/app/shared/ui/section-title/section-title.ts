import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type SectionTitleAlign = 'start' | 'center';

/** Large gradient watermark (main title) + orange subtitle row with dumbbell icon. */
@Component({
  selector: 'app-section-title',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './section-title.html',
  styleUrl: './section-title.scss',
})
export class SectionTitle {
  /** Main title — large outline text (e.g. ABOUT US, WORKOUTS). */
  readonly backgroundTitle = input.required<string>();

  /** Subtitle under the main title (e.g. About Us, Fitness Class). */
  readonly label = input.required<string>();

  readonly align = input<SectionTitleAlign>('start');
}

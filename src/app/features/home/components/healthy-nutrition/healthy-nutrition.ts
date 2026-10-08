import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { ReusableCard } from '../../../../shared/ui/reusable-card/reusable-card';
import { SectionTitle } from '../../../../shared/ui/section-title/section-title';
import { MealCard } from '../../models/meal-card.model';
import { MealCategoryService } from '../../services/meal-category.service';

@Component({
  selector: 'app-healthy-nutrition',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionTitle, ReusableCard, TranslatePipe],
  templateUrl: './healthy-nutrition.html',
  styleUrl: './healthy-nutrition.scss',
})
export class HealthyNutrition {
  private readonly mealCategoryService = inject(MealCategoryService);
  
  readonly mealCards = signal<MealCard[]>([]);

  constructor() {
    this.mealCategoryService.getCategories().pipe(
      takeUntilDestroyed()
    ).subscribe(categories => {
      // Map API categories to our MealCard model and limit to 3 to maintain the single-row UI design
      const cards = categories.slice(0, 3).map(category => ({
        id: category.idCategory,
        titleKey: category.strCategory,
        image: category.strCategoryThumb,
        alt: category.strCategory,
      }));
      this.mealCards.set(cards);
    });
  }
}

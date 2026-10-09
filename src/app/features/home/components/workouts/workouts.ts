import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { ReusableCard } from '../../../../shared/ui/reusable-card/reusable-card';
import { SectionTitle } from '../../../../shared/ui/section-title/section-title';
import {
  MuscleGroup,
  WorkoutCardItem,
  WorkoutsService,
} from '../../services/workouts.service';

@Component({
  selector: 'app-workouts',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, SectionTitle, ReusableCard],
  templateUrl: './workouts.html',
  styleUrl: './workouts.scss',
})
export class Workouts implements OnInit {
  private readonly workoutsService = inject(WorkoutsService);

  /** Muscle groups loaded from backend API */
  readonly muscleGroups = signal<MuscleGroup[]>([]);

  /** Currently selected filter category ID ('all' for Full Body) */
  readonly activeCategory = signal<string>('all');

  /** All workout / muscle items for currently active category */
  readonly items = signal<WorkoutCardItem[]>([
    ...this.workoutsService.defaultFeaturedWorkouts,
  ]);

  /** Loading state during API category switches */
  readonly isLoading = signal<boolean>(false);

  /** Active carousel slide / page index (0-indexed) */
  readonly currentSlide = signal<number>(0);

  /** Responsive items per view based on screen size */
  readonly itemsPerPage = signal<number>(3);

  /** Computed total number of carousel pages */
  readonly totalPages = computed(() => {
    const total = this.items().length;
    const perPage = this.itemsPerPage();
    return Math.max(1, Math.ceil(total / perPage));
  });

  /** Computed array of pages for pagination dot indicators */
  readonly pages = computed(() => {
    const count = this.totalPages();
    // Guarantee at least 3 dots matching mockup presentation if there are items
    const minDots = Math.max(count, Math.min(3, this.items().length));
    return Array.from({ length: minDots }, (_, i) => i);
  });

  /** Items currently visible in the active carousel slide */
  readonly visibleItems = computed(() => {
    const list = this.items();
    const perPage = this.itemsPerPage();
    const page = Math.min(this.currentSlide(), Math.max(0, this.totalPages() - 1));
    const start = page * perPage;
    return list.slice(start, start + perPage);
  });

  ngOnInit(): void {
    this.updateItemsPerPage();
    this.loadMuscleGroups();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateItemsPerPage();
  }

  private updateItemsPerPage(): void {
    if (typeof window === 'undefined') return;
    const width = window.innerWidth;
    if (width < 640) {
      this.itemsPerPage.set(1);
    } else if (width < 1024) {
      this.itemsPerPage.set(2);
    } else {
      this.itemsPerPage.set(3);
    }
  }

  /** Loads muscle groups from API and keeps 'Full Body' as the initial active category */
  loadMuscleGroups(): void {
    this.workoutsService.getMuscleGroups().subscribe((groups) => {
      this.muscleGroups.set(groups);
    });
  }

  /** Filters programs by selected muscle group */
  selectCategory(groupId: string): void {
    this.activeCategory.set(groupId);
    this.currentSlide.set(0);

    if (groupId === 'all') {
      this.items.set([...this.workoutsService.defaultFeaturedWorkouts]);
      return;
    }

    this.isLoading.set(true);
    this.workoutsService.getMusclesByGroupId(groupId).subscribe({
      next: (muscles) => {
        if (muscles && muscles.length > 0) {
          const mapped: WorkoutCardItem[] = muscles.map((m) => ({
            id: m._id,
            title: m.name,
            image: m.image,
            alt: m.name,
          }));
          this.items.set(mapped);
        } else {
          // If no specific exercises for this group, display default workouts
          this.items.set([...this.workoutsService.defaultFeaturedWorkouts]);
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.items.set([...this.workoutsService.defaultFeaturedWorkouts]);
        this.isLoading.set(false);
      },
    });
  }

  /** Navigates carousel to specific slide index */
  goToSlide(index: number): void {
    const maxIndex = Math.max(0, this.totalPages() - 1);
    this.currentSlide.set(Math.min(index, maxIndex));
  }

  /** Navigates to previous carousel slide */
  prevSlide(): void {
    this.currentSlide.update((curr) => (curr > 0 ? curr - 1 : this.totalPages() - 1));
  }

  /** Navigates to next carousel slide */
  nextSlide(): void {
    this.currentSlide.update((curr) => (curr < this.totalPages() - 1 ? curr + 1 : 0));
  }

  /** Card click handler */
  onCardClick(item: WorkoutCardItem): void {
    // Interactive action hook
  }
}

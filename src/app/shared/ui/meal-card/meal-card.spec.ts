import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TranslationService } from '../../../core/services/translation.service';
import { MealCard } from './meal-card';

describe('MealCard', () => {
  let fixture: ComponentFixture<MealCard>;
  let component: MealCard;

  const translationServiceMock = {
    translate: vi.fn((key: string) => {
      const map: Record<string, string> = {
        'MEAL_CARD.BREAKFAST': 'BREAKFAST',
        'MEAL_CARD.READ_MORE': 'Read More',
      };
      return map[key] ?? key;
    }),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [MealCard],
      providers: [
        provideRouter([]),
        { provide: TranslationService, useValue: translationServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MealCard);
    component = fixture.componentInstance;
  });

  it('should create MealCard component', () => {
    fixture.componentRef.setInput('title', 'MEAL_CARD.BREAKFAST');
    fixture.componentRef.setInput('image', 'images/healthy-1.webp');
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should render image with src and alt attributes', () => {
    fixture.componentRef.setInput('title', 'MEAL_CARD.BREAKFAST');
    fixture.componentRef.setInput('image', 'images/healthy-1.webp');
    fixture.componentRef.setInput('alt', 'Delicious breakfast plate');
    fixture.detectChanges();

    const img = fixture.nativeElement.querySelector('.meal-card__image') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe('images/healthy-1.webp');
    expect(img.getAttribute('alt')).toBe('Delicious breakfast plate');
  });

  it('should fallback to translated title if alt is not provided', () => {
    fixture.componentRef.setInput('title', 'MEAL_CARD.BREAKFAST');
    fixture.componentRef.setInput('image', 'images/healthy-1.webp');
    fixture.detectChanges();

    const img = fixture.nativeElement.querySelector('.meal-card__image') as HTMLImageElement;
    expect(img.getAttribute('alt')).toBe('BREAKFAST');
  });

  it('should render translated title and default Read More CTA label', () => {
    fixture.componentRef.setInput('title', 'MEAL_CARD.BREAKFAST');
    fixture.componentRef.setInput('image', 'images/healthy-1.webp');
    fixture.detectChanges();

    const titleEl = fixture.nativeElement.querySelector('.meal-card__title');
    const ctaLabelEl = fixture.nativeElement.querySelector('.meal-card__cta-label');

    expect(titleEl.textContent.trim()).toBe('BREAKFAST');
    expect(ctaLabelEl.textContent.trim()).toBe('Read More');
  });

  it('should emit cardClick output when card is clicked', () => {
    fixture.componentRef.setInput('title', 'MEAL_CARD.BREAKFAST');
    fixture.componentRef.setInput('image', 'images/healthy-1.webp');
    fixture.detectChanges();

    const spy = vi.fn();
    component.cardClick.subscribe(spy);

    const card = fixture.nativeElement.querySelector('.meal-card') as HTMLElement;
    card.click();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should emit cardClick output when Enter or Space is pressed', () => {
    fixture.componentRef.setInput('title', 'MEAL_CARD.BREAKFAST');
    fixture.componentRef.setInput('image', 'images/healthy-1.webp');
    fixture.detectChanges();

    const spy = vi.fn();
    component.cardClick.subscribe(spy);

    const card = fixture.nativeElement.querySelector('.meal-card') as HTMLElement;
    card.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));

    expect(spy).toHaveBeenCalledTimes(1);
  });
});

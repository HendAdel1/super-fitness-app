import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthyNutrition } from './healthy-nutrition';

import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslationService } from '../../../../core/services/translation.service';

describe('HealthyNutrition', () => {
  let component: HealthyNutrition;
  let fixture: ComponentFixture<HealthyNutrition>;
  let httpTestingController: HttpTestingController;

  const mockTranslationService = {
    translate: jasmine.createSpy('translate').and.callFake((key: string) => key),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthyNutrition],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: TranslationService, useValue: mockTranslationService },
      ],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(HealthyNutrition);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    // Flush the initial constructor request
    const req = httpTestingController.expectOne('https://www.themealdb.com/api/json/v1/1/categories.php');
    req.flush({ categories: [] });
    
    expect(component).toBeTruthy();
  });

  it('should fetch categories and map the first 3 to mealCards signal', () => {
    const mockCategories = {
      categories: [
        { idCategory: '1', strCategory: 'Beef', strCategoryThumb: 'beef.png' },
        { idCategory: '2', strCategory: 'Chicken', strCategoryThumb: 'chicken.png' },
        { idCategory: '3', strCategory: 'Dessert', strCategoryThumb: 'dessert.png' },
        { idCategory: '4', strCategory: 'Lamb', strCategoryThumb: 'lamb.png' },
      ],
    };

    // Constructor fires the request automatically
    const req = httpTestingController.expectOne('https://www.themealdb.com/api/json/v1/1/categories.php');
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);

    fixture.detectChanges();

    const cards = component.mealCards();
    
    // Assert exactly 3 cards
    expect(cards.length).toBe(3);
    
    // Assert mapping
    expect(cards[0].id).toBe('1');
    expect(cards[0].titleKey).toBe('Beef');
    expect(cards[0].image).toBe('beef.png');
    expect(cards[0].alt).toBe('Beef');
    
    // Make sure 4th item wasn't added
    expect(cards.find(c => c.id === '4')).toBeUndefined();
  });
});

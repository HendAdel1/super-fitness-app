import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import type { SupportedLanguage, TextDirection } from '../../../core/models/translation.models';
import { TranslationService } from '../../../core/services/translation.service';
import { LanguageSwitcher } from './language-switcher';

describe('LanguageSwitcher', () => {
  let fixture: ComponentFixture<LanguageSwitcher>;
  let component: LanguageSwitcher;

  const currentLangSignal = signal<SupportedLanguage>('en');
  const directionSignal = signal<TextDirection>('ltr');
  const isLoadingSignal = signal<boolean>(false);

  let translationServiceMock: {
    currentLang: typeof currentLangSignal;
    direction: typeof directionSignal;
    isLoading: typeof isLoadingSignal;
    setLanguage: ReturnType<typeof vi.fn>;
    toggleLanguage: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    localStorage.clear();
    currentLangSignal.set('en');
    directionSignal.set('ltr');
    isLoadingSignal.set(false);

    translationServiceMock = {
      currentLang: currentLangSignal,
      direction: directionSignal,
      isLoading: isLoadingSignal,
      setLanguage: vi.fn().mockReturnValue(of({})),
      toggleLanguage: vi.fn().mockReturnValue(of({})),
    };

    await TestBed.configureTestingModule({
      imports: [LanguageSwitcher],
      providers: [{ provide: TranslationService, useValue: translationServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSwitcher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create the LanguageSwitcher component', () => {
    expect(component).toBeTruthy();
  });

  it('should render language buttons reflecting current state', () => {
    const enButton = fixture.nativeElement.querySelector('[data-test="lang-en"]') as HTMLButtonElement;
    const arButton = fixture.nativeElement.querySelector('[data-test="lang-ar"]') as HTMLButtonElement;

    expect(enButton).toBeTruthy();
    expect(arButton).toBeTruthy();
    expect(enButton.getAttribute('aria-pressed')).toBe('true');
    expect(arButton.getAttribute('aria-pressed')).toBe('false');
  });

  it('should call setLanguage with "ar" when Arabic button is clicked', () => {
    const arButton = fixture.nativeElement.querySelector('[data-test="lang-ar"]') as HTMLButtonElement;
    arButton.click();

    expect(translationServiceMock.setLanguage).toHaveBeenCalledWith('ar');
  });

  it('should not call setLanguage if the already active language is clicked', () => {
    const enButton = fixture.nativeElement.querySelector('[data-test="lang-en"]') as HTMLButtonElement;
    enButton.click();

    expect(translationServiceMock.setLanguage).not.toHaveBeenCalled();
  });

  it('should toggle language via toggleLanguage()', () => {
    component.toggleLanguage();
    expect(translationServiceMock.toggleLanguage).toHaveBeenCalled();
  });

  it('should switch theme between light and dark', () => {
    const sunButton = fixture.nativeElement.querySelector('[data-test="theme-light"]') as HTMLButtonElement;
    const moonButton = fixture.nativeElement.querySelector('[data-test="theme-dark"]') as HTMLButtonElement;

    expect(component.currentTheme()).toBe('dark');
    expect(moonButton.getAttribute('aria-pressed')).toBe('true');

    sunButton.click();
    fixture.detectChanges();

    expect(component.currentTheme()).toBe('light');
    expect(sunButton.getAttribute('aria-pressed')).toBe('true');
    expect(moonButton.getAttribute('aria-pressed')).toBe('false');
  });
});

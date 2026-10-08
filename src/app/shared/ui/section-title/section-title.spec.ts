import { TestBed } from '@angular/core/testing';
import { SectionTitle } from './section-title';

describe('SectionTitle', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionTitle],
    }).compileComponents();
  });

  it('renders watermark and label (start alignment)', () => {
    const fixture = TestBed.createComponent(SectionTitle);
    fixture.componentRef.setInput('backgroundTitle', 'ABOUT US');
    fixture.componentRef.setInput('label', 'About Us');
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.section-title--start')).toBeTruthy();
    expect(el.querySelector('.section-title__watermark')?.textContent?.trim()).toBe('ABOUT US');
    expect(el.textContent).toContain('About Us');
  });

  it('applies center alignment', () => {
    const fixture = TestBed.createComponent(SectionTitle);
    fixture.componentRef.setInput('backgroundTitle', 'WORKOUTS');
    fixture.componentRef.setInput('label', 'Fitness Class');
    fixture.componentRef.setInput('align', 'center');
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.section-title--center')).toBeTruthy();
  });
});

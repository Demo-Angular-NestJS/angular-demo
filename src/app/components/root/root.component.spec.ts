import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RootComponent } from './root.component';
import { TranslocoTestingModule } from '@ngneat/transloco';


describe('RootComponent', () => {
  let component: RootComponent;
  let fixture: ComponentFixture<RootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
      ],
      imports: [
        RootComponent,
        TranslocoTestingModule.forRoot({
          langs: { en: { "hello": "Hello World" } },
          translocoConfig: {
            availableLangs: ['en'],
            defaultLang: 'en',
          },
          preloadLangs: true
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignInFormComponent } from './sign-in-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Injectable, provideZonelessChangeDetection } from '@angular/core';
import { provideTransloco, TranslocoLoader } from '@ngneat/transloco';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

@Injectable({ providedIn: 'root' })
class TranslocoTestLoader implements TranslocoLoader {
  getTranslation(lang: string) {
    return of({
      signInForm: {
        title: 'Sign In',
        submit: 'Login'
      }
    });
  }
}

describe('SignInFormComponent', () => {
  let component: SignInFormComponent;
  let fixture: ComponentFixture<SignInFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SignInFormComponent,
        NoopAnimationsModule
      ],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        // Use the official provider instead of a manual spy
        provideTransloco({
          config: {
            availableLangs: ['en'],
            defaultLang: 'en',
          },
          // Mock loader to return empty translations or specific keys
          loader: TranslocoTestLoader
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInFormComponent);
    component = fixture.componentInstance;

    // With Zoneless, we want to ensure signals/inputs are ready
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with password hidden', () => {
    // Accessing the signal value
    expect(component['hidePassword']()).toBeTrue();
  });

  it('should toggle hidePassword signal when togglePassword is called', () => {
    component['togglePassword']();
    expect(component['hidePassword']()).toBeFalse();

    component['togglePassword']();
    expect(component['hidePassword']()).toBeTrue();
  });

  it('should emit submitData when form is valid and onSubmit is called', () => {
    // Spy on the output emitter
    spyOn(component.submitData, 'emit');

    // Manually set form values to be valid (mocking validatedValue)
    const mockValue = { email: 'test@example.com', password: 'password123' };

    // Using Object.defineProperty if validatedValue is a getter in FormBaseComponent
    spyOnProperty(component, 'validatedValue', 'get').and.returnValue(mockValue);

    component.onSubmit();

    expect(component.submitData.emit).toHaveBeenCalledWith(mockValue);
  });

  it('should not emit submitData if the form is invalid', () => {
    spyOn(component.submitData, 'emit');

    // Mock validatedValue as null/undefined
    spyOnProperty(component, 'validatedValue', 'get').and.returnValue(null);

    component.onSubmit();

    expect(component.submitData.emit).not.toHaveBeenCalled();
  });

  it('should reflect the networkActive input', () => {
    fixture.componentRef.setInput('networkActive', true);
    fixture.detectChanges();

    expect(component.networkActive()).toBeTrue();
  });
});

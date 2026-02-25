/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { UserHelperService } from '@s/user-helper.service';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideZonelessChangeDetection, Injectable } from '@angular/core';
import { provideTransloco, TranslocoLoader } from '@ngneat/transloco';
import { delay, of, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideEntityData, withEffects } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
class TranslocoTestLoader implements TranslocoLoader {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getTranslation(lang: string) {
    return of({
      registerPage: {
        'Your account has been created message': 'Success',
        'An error occurred message': 'Error'
      }
    });
  }
}

const entityConfig = {
  entityMetadata: {
    CurrentFavourites: {},
    CurrentUser: {},
    CurrentUserConfiguration: {}
  }
};

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userHelperSpy: jasmine.SpyObj<UserHelperService>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    userHelperSpy = jasmine.createSpyObj('UserHelperService', ['register']);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, NoopAnimationsModule],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideStore({}),
        provideEffects([]),
        provideEntityData(entityConfig, withEffects()),
        provideRouter([]),
        { provide: UserHelperService, useValue: userHelperSpy },
        { provide: ToastrService, useValue: toastrSpy },
        provideTransloco({
          config: { availableLangs: ['en'], defaultLang: 'en' },
          loader: TranslocoTestLoader
        }),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle successful registration', async () => {
    const mockFormData = { email: 'test@test.com', password: '123' } as any;
    // Use delay(0) to push the emission to the next microtask
    userHelperSpy.register.and.returnValue(of({} as any).pipe(delay(0)));
    const navigateSpy = spyOn(component['router'], 'navigate');

    // Trigger protected method via bracket notation
    component['registerEvent'](mockFormData);

    expect(component['networkActive']()).toBeTrue(); // Check loading state during call
    //manually wait for the stable state and force the microtask queue to flush.
    await new Promise(resolve => setTimeout(resolve, 0));
    fixture.detectChanges();

    expect(component['networkActive']()).toBeFalse();
    expect(toastrSpy.success).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith([component['searchSignInRoute']]);
  });

  it('should handle registration error', async () => {
    const mockFormData = { email: 'test@test.com' } as any;
    userHelperSpy.register.and.returnValue(throwError(() => new Error('Fail')));

    component['registerEvent'](mockFormData);

    await fixture.whenStable();

    expect(toastrSpy.error).toHaveBeenCalled();
    expect(component['networkActive']()).toBeFalse();
  });
});

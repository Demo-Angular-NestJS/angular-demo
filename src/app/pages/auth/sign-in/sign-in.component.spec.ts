/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SignInComponent } from './sign-in.component';
import { AuthService } from '@s/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslocoService } from '@ngneat/transloco';
import { of, throwError } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';
import { SignInFormModel } from '@c/auth';
import { defaultRoute, searchHomeRoute } from '@constants';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideEntityData, withEffects } from '@ngrx/data';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

const entityConfig = {
  entityMetadata: {
    CurrentFavourites: {},
    CurrentUser: {},
    CurrentUserConfiguration: {}
  }
};

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;
  let translocoSpy: jasmine.SpyObj<TranslocoService>;

  const mockCredentials: SignInFormModel = { email: 'test@example.com', password: 'password123' };

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    // Pre-emptively set a default return to prevent 'pipe' of undefined errors
    authServiceSpy.login.and.returnValue(of({}));

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['error']);
    translocoSpy = jasmine.createSpyObj('TranslocoService', ['translate', 'selectTranslate']);
    // Mock the observables
    (translocoSpy as any).langChanges$ = of('en');
    (translocoSpy as any).events$ = of({ type: 'translationLoadSuccess', payload: { lang: 'en' } });
    // Mock the config property
    (translocoSpy as any).config = {
      availableLangs: ['en'],
      defaultLang: 'en',
      missingHandler: { allowEmpty: true } // Ensure this exists
    };
    translocoSpy.selectTranslate.and.returnValue(of(''));
    translocoSpy.translate.and.returnValue('');

    await TestBed.configureTestingModule({
      imports: [SignInComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideStore({}),
        provideEffects([]),
        provideEntityData(entityConfig, withEffects()),
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ToastrService, useValue: toastrSpy },
        { provide: TranslocoService, useValue: translocoSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParams: {} } }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('signInEvent success', () => {
    it('should navigate to defaultRoute when no returnUrl is present', () => {
      authServiceSpy.login.and.returnValue(of({}));

      // Accessing protected method for testing
      (component as any).signInEvent(mockCredentials);

      expect(authServiceSpy.login).toHaveBeenCalledWith(mockCredentials);
      expect(routerSpy.navigate).toHaveBeenCalledWith([defaultRoute]);
      expect((component as any).networkActive()).toBeFalse();
    });

    it('should navigate to returnUrl when present in queryParams', () => {
      const returnUrl = searchHomeRoute;
      const route = TestBed.inject(ActivatedRoute);
      route.snapshot.queryParams = { returnUrl };

      authServiceSpy.login.and.returnValue(of({}));

      (component as any).signInEvent(mockCredentials);

      expect(routerSpy.navigate).toHaveBeenCalledWith([returnUrl]);
    });
  });

  describe('signInEvent error', () => {
    it('should handle error, show toastr, and reset networkActive', () => {
      const errorResponse = { error: { message: 'invalidCredentials' } };
      authServiceSpy.login.and.returnValue(throwError(() => errorResponse));
      translocoSpy.translate.and.returnValue('Translated Error Message');

      (component as any).signInEvent(mockCredentials);

      expect((component as any).networkActive()).toBeFalse();
      expect(translocoSpy.translate).toHaveBeenCalledWith('global.generalErrors.invalidCredentials');
      expect(toastrSpy.error).toHaveBeenCalledWith('Translated Error Message');
    });

    it('should use default error message if backend does not provide one', () => {
      authServiceSpy.login.and.returnValue(throwError(() => ({ error: {} })));

      (component as any).signInEvent(mockCredentials);

      expect(translocoSpy.translate).toHaveBeenCalledWith('global.generalErrors.An error occurred, please try again');
    });
  });
});

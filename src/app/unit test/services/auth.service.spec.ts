import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { PLATFORM_ID, provideZonelessChangeDetection } from '@angular/core'; // 1. Import this
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthService } from '@s/auth.service';
import { environment } from '@env/environment';
import { GlobalActionTypes } from '@data/actions/global.actions';
import { LoginModel } from '@m/class';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let store: MockStore;
  const apiURL = `${environment.apiUrl}/auth`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMockStore(),
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
  });

  afterEach(() => {
    httpMock.verify();
  });

  // login()
  it('should set isAuthenticated to true and dispatch login action on success', () => {
    const mockCredentials: LoginModel = { email: 'test@test.com', password: '123' };

    service.login(mockCredentials).subscribe();

    const req = httpMock.expectOne(`${apiURL}/login`);
    expect(req.request.method).toBe('POST');
    req.flush({});

    expect(service.isAuthenticated()).toBeTrue();
    expect(store.dispatch).toHaveBeenCalledWith({ type: GlobalActionTypes.AppLogIn });
  });

  // checkSession()
  it('should return true and set authenticated when session is valid', (done) => {
    service.checkSession().subscribe((res) => {
      expect(res).toBeTrue();
      expect(service.isAuthenticated()).toBeTrue();
      done();
    });

    const req = httpMock.expectOne(`${apiURL}/me`);
    req.flush({ user: 'test' });
  });

  it('should return false and set authenticated to false on error', (done) => {
    service.checkSession().subscribe((res) => {
      expect(res).toBeFalse();
      expect(service.isAuthenticated()).toBeFalse();
      done();
    });

    const req = httpMock.expectOne(`${apiURL}/me`);
    req.error(new ProgressEvent('error'));
  });

  // logout()
  it('should reset auth state and dispatch logout action', () => {
    service.isAuthenticated.set(true);

    service.logout();

    expect(service.isAuthenticated()).toBeFalse();
    expect(store.dispatch).toHaveBeenCalledWith({ type: GlobalActionTypes.AppLogout });

    const req = httpMock.expectOne(`${apiURL}/logout`);
    expect(req.request.method).toBe('POST');
    req.flush({});

    expect(service.isAuthenticated()).toBeFalse();
  });
});

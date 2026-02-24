import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '@env/environment';
import { provideZonelessChangeDetection } from '@angular/core';
import { CSRFService } from '@s/csrf.service';

describe('CSRFService', () => {
  let service: CSRFService;
  let httpMock: HttpTestingController;
  const apiURL = `${environment.apiUrl}/auth/token`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CSRFService,
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(), // Mocks the actual backend
      ],
    });

    service = TestBed.inject(CSRFService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensures no unplanned extra HTTP requests were made
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch the token and update the signal on the first call', async () => {
    const mockToken = 'test-csrf-token-123';

    // Start the call
    const promise = service.validateCSRFToken();

    // Expect a GET request to the specific URL
    const req = httpMock.expectOne(apiURL);
    expect(req.request.method).toBe('GET');
    expect(req.request.withCredentials).toBeTrue();

    // Respond with mock data
    req.flush({ token: mockToken });

    // Await the promise and check results
    const result = await promise;
    expect(result).toBe(mockToken);
    expect(service.getToken()).toBe(mockToken);
  });

  it('should return null and not call the API if a token already exists', async () => {
    // First, manually seed the signal (via a successful call or internal state)
    // We simulate this by performing one successful flow first
    const firstCallPromise = service.validateCSRFToken();
    httpMock.expectOne(apiURL).flush({ token: 'initial-token' });
    await firstCallPromise;

    // Now, attempt to validate again
    const secondCallResult = await service.validateCSRFToken();

    // Assert: No new HTTP request should be made
    httpMock.expectNone(apiURL);
    expect(secondCallResult).toBeNull();
  });

  it('should handle errors and return null', async () => {
    const promise = service.validateCSRFToken();

    const req = httpMock.expectOne(apiURL);
    // Simulate a 500 server error
    req.flush('Error fetching token', { status: 500, statusText: 'Server Error' });

    const result = await promise;
    expect(result).toBeNull();
    expect(service.getToken()).toBeNull();
  });
});

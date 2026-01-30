import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { searchHomeRoute, signInRoute } from '@constants';
import { environment } from '@env/environment';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly API_URL = `${environment.apiUrl}/auth`;

  // Estado del usuario con Signals
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public currentUser = signal<any | null>(null);
  public isAuthenticated = signal<boolean>(false);

  public checkSession(): Observable<boolean> {
    return this.http.get(`${this.API_URL}/me`, { withCredentials: true }).pipe(
      tap((user) => {
        this.currentUser.set(user);
        this.isAuthenticated.set(true);
      }),
      map(() => true),
      catchError(() => {
        this.logout();
        return of(false);
      })
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public login(credentials: any) {
    return this.http.post(`${this.API_URL}/login`, credentials, { withCredentials: true }).pipe(
      tap(() => {
        this.isAuthenticated.set(true);
        this.router.navigate([searchHomeRoute]);
      })
    );
  }

  public refreshToken() {
    return this.http.post(`${this.API_URL}/refresh`, {}, { withCredentials: true }).pipe(
      tap(() => console.log('Token refrescado automáticamente por actividad'))
    );
  }

  public logout() {
    this.http.post(`${this.API_URL}/logout`, {}, { withCredentials: true }).subscribe();
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate([`/${signInRoute}`]);
  }
}

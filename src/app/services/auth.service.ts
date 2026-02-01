/* eslint-disable @typescript-eslint/no-explicit-any */
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Router } from '@angular/router';
import { searchHomeRoute, searchSignInRoute } from '@constants';
import { environment } from '@env/environment';
import { catchError, map, NEVER, Observable, of, tap, timeout } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public currentUser = signal<any | null>(null);
  public isAuthenticated = signal<boolean>(false);

  private _platformId = inject(PLATFORM_ID);
  private _http = inject(HttpClient);
  private _router = inject(Router);
  private readonly API_URL = `${environment.apiUrl}/auth`;

  public login(credentials: any) {
    return this._http.post(`${this.API_URL}/login`, credentials).pipe(
      tap((response: any) => {
        this.isAuthenticated.set(true);
        this.currentUser.set(response.user || null);
        this._router.navigate([searchHomeRoute]);
      })
    );
  }

  public checkSession(): Observable<boolean> {
    if (!isPlatformBrowser(this._platformId)) {
      return NEVER;
    }

    return this._http.get(`${this.API_URL}/me`).pipe(
      timeout(5000),
      tap((user) => {
        this.currentUser.set(user);
        this.isAuthenticated.set(true);
      }),
      map(() => true),
      catchError(() => {
        this.currentUser.set(null);
        this.isAuthenticated.set(false);
        return of(false);
      })
    );
  }

  public logout() {
    this._http.post(`${this.API_URL}/logout`, {}).pipe(
      catchError(() => of(null)),
      tap(() => this.handleUnauthenticated())
    ).subscribe();
  }

  private handleUnauthenticated() {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this._router.navigate([searchSignInRoute]);
  }
}

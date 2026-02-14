/* eslint-disable @typescript-eslint/no-explicit-any */
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { GlobalActionTypes } from '@data/actions/global.actions';
import { environment } from '@env/environment';
import { LoginModel } from '@m/class';
import { Store } from '@ngrx/store';
import { catchError, map, NEVER, Observable, of, tap, timeout } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public isAuthenticated = signal<boolean>(false);

  private readonly store = inject(Store);
  private _platformId = inject(PLATFORM_ID);
  private _http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/auth`;

  public login(credentials: LoginModel) {
    return this._http.post(`${this.API_URL}/login`, credentials).pipe(
      tap(() => this.isAuthenticated.set(true)),
      tap(() => this.store.dispatch({ type: GlobalActionTypes.AppLogIn })),
    );
  }

  public checkSession(): Observable<boolean> {
    if (!isPlatformBrowser(this._platformId)) {
      return NEVER;
    }

    return this._http.get(`${this.API_URL}/me`).pipe(
      timeout(environment.apiTimeoutMs),
      tap(() => this.isAuthenticated.set(true)),
      map(() => true),
      catchError(() => {
        this.isAuthenticated.set(false);
        return of(false);
      })
    );
  }

  public logout() {
    this.isAuthenticated.set(false);
    this.store.dispatch({ type: GlobalActionTypes.AppLogout });
    this._http.post(`${this.API_URL}/logout`, {}).pipe(
      catchError(() => of(null)),
      tap(() => this.handleUnauthenticated())
    ).subscribe();
  }

  private handleUnauthenticated() {
    this.isAuthenticated.set(false);
  }
}

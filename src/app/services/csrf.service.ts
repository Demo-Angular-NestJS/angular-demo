import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class CSRFService {
  private tokenSignal = signal<string | null>(null);
  private readonly API_URL = `${environment.apiUrl}/auth`;

  private _http = inject(HttpClient);

  public async validateCSRFToken(): Promise<string | null> {
   try {
      // If we already have a token, don't fetch again
      if (this.tokenSignal()) {
        return null;
      };

      const response = await firstValueFrom(
        this._http.get<{ token: string }>(`${this.API_URL}/token`, {
          withCredentials: true // Crucial to receive the cookie
        })
      );

      this.tokenSignal.set(response.token);
      return response.token;
    } catch (error) {
      console.error('CSRF Initialization failed:', error);
      return null;
    }
  }

  public getToken() {
    return this.tokenSignal();
  }
}

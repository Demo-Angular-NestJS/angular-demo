import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private _loadingCount = signal(0);

  readonly isLoading = computed(() => this._loadingCount() > 0);

  show() {
    this._loadingCount.update(count => count + 1);
  }

  hide() {
    setTimeout(() => {
      this._loadingCount.update(count => Math.max(0, count - 1));
    }, 500);
  }
}

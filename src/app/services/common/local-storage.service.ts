/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = this.document.defaultView !== null;

  /**
   * Set a value in localStorage
   */
  setItem(key: string, value: any): void {
    if (!this.isBrowser) return;

    const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  }

  /**
   * Get a value from localStorage
   */
  getItem<T>(key: string): T | null {
    if (!this.isBrowser) return null;

    const item = localStorage.getItem(key);
    if (!item) return null;

    try {
      return JSON.parse(item) as T;
    } catch {
      return item as unknown as T;
    }
  }

  /**
   * Remove a specific item
   */
  removeItem(key: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(key);
    }
  }

  /**
   * Clear all storage
   */
  clear(): void {
    if (this.isBrowser) {
      localStorage.clear();
    }
  }
}

export const localStorageStage = {
  activeLang: "active_lang"
}

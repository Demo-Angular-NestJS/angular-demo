import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { defaultLanguage } from '@constants';
import { environment } from '@env/environment';
import { TranslocoService } from '@ngneat/transloco';
import { LocalStorageService, localStorageStage } from '@s/common';

@Component({
  standalone: true,
  selector: 'app-choose-language',
  templateUrl: './choose-language.component.html',
  imports: [
    CommonModule,
    FormsModule,
  ],
})
export class ChooseLanguageComponent implements AfterViewInit {
  protected readonly translocoService = inject(TranslocoService);
  protected readonly localStorageService = inject(LocalStorageService);

  protected activeLang = signal<string | null>(null);
  protected availableLangs = environment.availableLangs || [defaultLanguage];

  constructor() {
    effect(() => {
      const lang = this.activeLang();

      if (lang) {
        this.localStorageService.setItem(localStorageStage.activeLang, lang);
        this.translocoService.setActiveLang(lang);
      }
    });
  }

  ngAfterViewInit() {
    const saved = this.localStorageService.getItem<string>(localStorageStage.activeLang);
    this.activeLang.set(saved || this.translocoService.getActiveLang());
  }

  protected changeLanguageEvent(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.activeLang.set(selectElement.value);
  }
}

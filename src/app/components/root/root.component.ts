import { CommonModule } from '@angular/common';
import { afterNextRender, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingSkeletonComponent } from '@c/common/core/loading-skeleton/loading-skeleton.component';
import { TranslocoService } from '@ngneat/transloco';
import { GlobalStateService, LocalStorageService, localStorageStage } from '@s/common';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './root.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterOutlet,
    LoadingSkeletonComponent,
  ],
})
export class RootComponent {
  protected readonly globalStateService = inject(GlobalStateService);
  protected readonly translocoService = inject(TranslocoService);
  protected readonly localStorageService = inject(LocalStorageService);

  constructor() {
    afterNextRender(() => {
      const savedLang = this.localStorageService.getItem<string>(localStorageStage.activeLang);

      if (savedLang) {
        this.translocoService.setActiveLang(savedLang);
      }
    });
  }
}

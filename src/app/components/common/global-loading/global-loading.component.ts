import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingService } from '@s/common/loading.service';

@Component({
  selector: 'app-global-loading',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  template: `
    @if (isLoading()) {
      <div class="fixed top-0 left-0 right-0 z-[10000] h-1 w-full pointer-events-none">
        <mat-progress-bar  mode="indeterminate"  color="primary"
          class="h-1 shadow-[0_1px_10px_rgba(var(--primary-rgb),0.5)]">
        </mat-progress-bar>
        <div class="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-primary/10 to-transparent"></div>
      </div>
    }
  `,
  styles: [`
    :host ::ng-deep .mat-mdc-progress-bar {
      --mdc-linear-progress-track-height: 4px;
      --mdc-linear-progress-active-indicator-height: 4px;
    }
  `]
})
export class GlobalLoadingComponent {
  protected readonly isLoading = inject(LoadingService).isLoading;
}

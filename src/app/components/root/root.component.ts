import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingSkeletonComponent } from '@c/common/core/loading-skeleton/loading-skeleton.component';
import { GlobalStateService } from '@s/common';

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
  protected globalStateService = inject(GlobalStateService);
}

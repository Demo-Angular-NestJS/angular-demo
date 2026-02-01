import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalStateService } from '@s/common';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './root.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterOutlet,
  ],
})
export class RootComponent {
  protected globalStateService = inject(GlobalStateService);
}

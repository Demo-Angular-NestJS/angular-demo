import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { searchToyDetailRoute } from '@constants';
import { LookupMapPipe } from '@data/pipe';
import { CategoriesService } from '@data/services';
import { ToyModel } from '@m/class';

@Component({
  standalone: true,
  selector: 'app-toy-view-on-search',
  templateUrl: './toy-view-on-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    LookupMapPipe,
  ]
})
export class ToyViewOnSearchComponent {
  toyData = input<ToyModel>(new ToyModel({}));

  protected readonly categoriesService = inject(CategoriesService);
  protected readonly categoryMap = toSignal(this.categoriesService.entityMap$, { initialValue: {}});
  protected searchToyDetailRoute = searchToyDetailRoute;
}

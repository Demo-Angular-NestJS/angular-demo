import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ToyViewOnSearchComponent } from '../../shared';
import { PagingDataModel, ToyModel } from '@m/class';
import { defaultPageSize, pageSizeOptions } from '@constants';

@Component({
  standalone: true,
  selector: 'app-search-toy-list',
  templateUrl: './search-toy-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatPaginatorModule,
    ToyViewOnSearchComponent,
  ]
})
export class SearchToyListComponent {
  networkActive = input<boolean>(false);
  items = input<readonly ToyModel[]>([]);
  totalItems = input<number>(0);

  pagingChange = output<PagingDataModel>();

  protected defaultPageSize = defaultPageSize;
  protected pageSizeOptions = pageSizeOptions;

  protected pageChangeEvent(event: PageEvent) {
    this.pagingChange.emit({ page: event.pageIndex+1, itemsPerPage: event.pageSize})
  }
}

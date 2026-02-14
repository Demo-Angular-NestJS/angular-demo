import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BaseComponent } from '@c/shared/base.component';
import { searchToyRoute } from '@constants';
import { HasPermissionDirectiveModule } from '@d/has-permission-directive/has-permission-directive.module';
import { CategoriesService } from '@data/services';
import { CategoryModel, ToyModel } from '@m/class';
import { PageBreadCrumbModel } from '@m/page-bread-crumb.model';
import { ToyHelperService } from '@s/toy-helper.service';
import { filter, map, switchMap, tap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-toy-details-page',
  templateUrl: './toy-details-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HasPermissionDirectiveModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class ToyDetailsPageComponent extends BaseComponent implements OnInit {
  protected readonly categoriesService = inject(CategoriesService);

  protected selectedImage = signal<string | null>(null);
  protected readonly ItemData = signal(new ToyModel({}));
  protected readonly categoryMap = toSignal(this.categoriesService.entityMap$, { initialValue: {} });
  protected readonly category = computed<CategoryModel | null>(() => {
    const map = this.categoryMap() as Record<string, CategoryModel>;
    const item = this.ItemData();

    return map[item.categoryId] || null;
  });
  protected readonly itemImages = computed(() => [this.ItemData().imageUrl, ...(this.ItemData()?.imageUrls ?? [])])

  private readonly _toyHelperService = inject(ToyHelperService);

  constructor() {
    super();
    this.adminLayout?.breadCrumbs.set(defaultBreadCrumbs);
  }

  ngOnInit(): void {
    this.route.parent?.paramMap.pipe(
      map((params) => params.get('id')),
      filter((id): id is string => !!id),
      tap(() => this.networkActive.set(true)),
      switchMap((id) => this._toyHelperService.getById(id)),
    ).subscribe({
      next: (resp) => {
        this.networkActive.set(false);
        if (resp?.id) {
          this.setItemData(resp);
        } else {
          this.toastr.error('The toy was not found, please try again or later.');
          this.goBackEvent();
        }
      },
      error: () => {
        this.toastr.error('An error ocurred getting the Toy, please try again or later.');
        this.networkActive.set(false);
      }
    })
  }

  protected goBackEvent(): void {
    this.router.navigate([searchToyRoute]);
  }

  protected selectImageEvent(image: string): void {
     this.selectedImage.set(image);
  }

  protected addCartEvent(): void {
    this.toastr.warning('Not avaiable yet, working on it')
  }

  protected goToEditItemViewEvent(): void {
    this.router.navigate([searchToyRoute, this.ItemData().id]);
  }

  private setItemData(item: ToyModel): void {
    this.ItemData.set(item);
    this.setBreadCrumbs();
  }

  private setBreadCrumbs(): void {
    const breadCrumbs: PageBreadCrumbModel[] = [...defaultBreadCrumbs];

    if (this.ItemData()?.id) {
      breadCrumbs.push({ title: this.ItemData().name, url: null })
    }

    this.adminLayout?.breadCrumbs.set(breadCrumbs);
  }
}

const defaultBreadCrumbs: PageBreadCrumbModel[] = [
  { title: 'Toys', url: searchToyRoute, svgIcon: 'toy' },
  { title: 'Details', url: null, },
];

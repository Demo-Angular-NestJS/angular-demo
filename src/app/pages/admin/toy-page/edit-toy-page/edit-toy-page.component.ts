import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditToyFormComponent, EditToyImagesFormComponent } from '@c/admin';
import { BaseComponent } from '@c/shared/base.component';
import { searchToyDetailRoute, searchToyRoute } from '@constants';
import { ToyModel } from '@m/class';
import { PageBreadCrumbModel } from '@m/page-bread-crumb.model';
import { TranslocoModule } from '@ngneat/transloco';
import { ToyHelperService } from '@s/toy-helper.service';
import { provideTranslation } from '@u/helper';
import { TranslationLanguageEnum } from 'app/enum';
import { filter, map, of, switchMap, tap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-edit-toy-page',
  templateUrl: './edit-toy-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideTranslation('editToyPage', (lang: TranslationLanguageEnum) => import(`./i18n/${lang}.json`))],
  imports: [
    CommonModule,
    TranslocoModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    EditToyImagesFormComponent,
    EditToyFormComponent,
  ]
})
export class EditToyPageComponent extends BaseComponent implements OnInit {
  @ViewChild(EditToyImagesFormComponent) editToyImagesForm!: EditToyImagesFormComponent;
  @ViewChild(EditToyFormComponent) editToyForm!: EditToyFormComponent;

  protected readonly currentItemData = signal<ToyModel>(new ToyModel({}));
  protected savingData = signal(false);

  private readonly _toyHelperService = inject(ToyHelperService);

  constructor() {
    super();
    this.adminLayout?.breadCrumbs.set(defaultBreadCrumbs);
  }

  ngOnInit(): void {
    this.route.parent?.paramMap.pipe(
      map(params => params.get('id')),
      filter((id): id is string => !!id),
      tap(() => this.networkActive.set(true)),
      switchMap(id => {
        if (id.toLowerCase() === 'new') {
          return of(new ToyModel({}));
        }

        return this._toyHelperService.getById(id);
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (data) => {
        this.networkActive.set(false);
        this.setItemData(data);
      },
      error: () => {
        this.toastr.error(this.translocoService.translate('editToyPage.An error occurred getting message'));
        this.networkActive.set(false);
        this.goBackEvent();
      }
    });
  }

  protected saveDataEvent(): void {
    if (this.networkActive() || this.savingData() || !this.editToyImagesForm.validatedValue || !this.editToyForm.validatedValue) {
      return;
    }

    const saveData = new ToyModel({
      ...this.currentItemData(),
      ...this.editToyImagesForm.validatedValue,
      ...this.editToyForm.validatedValue,
    });

    this.savingData.set(true);
    this._toyHelperService.upsert(saveData).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (resp) => {
        const requestType = this.translocoService.translate(`global.common.${this.currentItemData()?.id ? 'Updated' : 'Saved'}`).toLowerCase();
        const message = this.translocoService.translate('editToyPage.The toy successfuly message', { name: resp.name, type: requestType});
        this.toastr.success(message);
        this.savingData.set(false);

        if (saveData?.id) {
          this.setItemData(resp);
        } else {
          this.router.navigate([searchToyRoute, resp.id]);
        }
      },
      error: () => {
        this.savingData.set(false);
        this.toastr.error(this.translocoService.translate('editToyPage.An error occurred saving message'));
      }
    });
  }

  protected goBackEvent(): void {
    this.router.navigate([searchToyRoute]);
  }

  private setItemData(data: ToyModel) {
    this.currentItemData.set(data);
    this.setBreadCrumbs();
  }

  private setBreadCrumbs(): void {
    const breadCrumbs: PageBreadCrumbModel[] = [...defaultBreadCrumbs];

    if (this.currentItemData()?.id) {
      breadCrumbs.push({ title: 'global.common.Details', url: `${searchToyDetailRoute}/${this.currentItemData().id}`, svgIcon: 'star', });
      breadCrumbs.push({ title: this.currentItemData().name, url: null })
    } else {
      breadCrumbs.push({ title: 'global.common.New', url: null })
    }

    this.adminLayout?.breadCrumbs.set(breadCrumbs);
  }
}

const defaultBreadCrumbs: PageBreadCrumbModel[] = [
  { title: 'global.pageTitles.Toys', url: searchToyRoute, svgIcon: 'toy' },
];

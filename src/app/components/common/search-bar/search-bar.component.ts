import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, HostListener, inject, signal, ViewChild } from '@angular/core';
import { FormBaseComponent } from '@c/shared/form-base.component';
import { searchBarForm, SearchBarFormModel } from './search-bar.model';
import { getGroup } from '@u/generic';
import { ToyModel } from '@m/class';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ToyHelperService } from '@s/toy-helper.service';
import { SearchRequestModel } from '@m/request';
import { SearchOperatorTypeEnum, TranslationLanguageEnum } from 'app/enum';
import { debounceTime } from 'rxjs';
import { DEBOUNCE_TIME_MS, searchToyDetailRoute } from '@constants';
import { FormDefaultsModule } from '@c/shared/form-defaults.module';
import { CategoriesService } from '@data/services';
import { LookupMapPipe } from '@data/pipe';
import { ToastrService } from 'ngx-toastr';
import { provideTranslation } from '@u/helper';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  standalone: true,
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideTranslation('searchBarSection', (lang: TranslationLanguageEnum) => import(`./i18n/${lang}.json`))],
  imports: [
    LookupMapPipe,
    FormDefaultsModule,
  ],
})
export class SearchBarComponent extends FormBaseComponent<SearchBarFormModel> {
  @ViewChild('searchContainer') searchContainer!: ElementRef;

  public readonly toyHelperService = inject(ToyHelperService);
  public readonly categoriesService = inject(CategoriesService);
  public readonly toastr = inject(ToastrService);

  public form = getGroup(searchBarForm);

  protected readonly categoryMap = toSignal(this.categoriesService.entityMap$, { initialValue: {}});
  protected isSearchOpen = signal(false);
  protected searchResults = signal<ToyModel[]>([]);
  protected searchToyDetailRoute = searchToyDetailRoute

  private readonly _translocoService = inject(TranslocoService);
  private readonly _destroyRef = inject(DestroyRef);

  constructor() {
    super();
    this.initFormListeners();

    this.form.valueChanges.pipe(
      debounceTime(DEBOUNCE_TIME_MS),
      takeUntilDestroyed()
    ).subscribe(() => this.searchItems());
  }

  @HostListener('document:click', ['$event'])
  clickout(event: PointerEvent | MouseEvent) {
    // Si el click fue fuera del contenedor, cerramos el dropdown
    if (this.isSearchOpen() && !this.searchContainer.nativeElement.contains(event.target)) {
      this.isSearchOpen.set(false);
    }
  }

  protected onSearchFocusEvent(value = true) {
    this.isSearchOpen.set(value);
  }

  private searchItems(): void {
    const search = this.validatedValue?.search ?? '';

    if (!search) {
      return;
    }

    const request: SearchRequestModel = {
      searchCriteria: [
        { fieldName: 'name', value: search, condition: SearchOperatorTypeEnum.LIKE, dataType: 'string' },
      ],
      page: 1,
      itemsPerPage: 10,
    }

    this.toyHelperService.search(request).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: (resp) => {
        this.searchResults.set(resp?.data ?? []);
      },
      error: () => {
        this.toastr.error(this._translocoService.translate('searchBarSection.An error occurred message'));
      }
    });
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectionStrategy, Component, inject, Input, output, signal } from '@angular/core';
import { FormBaseComponent } from '@c/shared/form-base.component';
import { editSearchToyFilterForm, SearchToyFilterFormModel } from './search-toy-filter-form.model';
import { getGroup } from '@u/generic';
import { FormDefaultsModule } from '@c/shared/form-defaults.module';
import { mapToSearchToyFilterFormModel } from './search-toy-filter-form.mapper';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { DEBOUNCE_TIME_MS } from '@constants';
import { CategoriesService } from '@data/services';
import { CategoryModel } from '@m/class';
import { provideTranslation } from '@u/helper';
import { TranslationLanguageEnum } from 'app/enum';

@Component({
  standalone: true,
  selector: 'app-search-toy-filter-form',
  templateUrl: './search-toy-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideTranslation('searchToyFilterForm', (lang: TranslationLanguageEnum) => import(`./i18n/${lang}.json`))],
  imports: [
    FormDefaultsModule,
  ],
})
export class SearchToyFilterFormComponent extends FormBaseComponent<SearchToyFilterFormModel> {
  filterDataChanged = output<SearchToyFilterFormModel>();

  public form = getGroup(editSearchToyFilterForm);

  protected categoriesService = inject(CategoriesService);

  protected isFilterOpen = signal(false);
  protected categories = toSignal(this.categoriesService.entities$, { initialValue: []});

  constructor() {
    super();
    this.initFormListeners();

    this.form.valueChanges.pipe(
      debounceTime(DEBOUNCE_TIME_MS),
      takeUntilDestroyed()
    ).subscribe((v) => {
      if (v.minAge ===  0 && v.maxAge === 0) {
        v.minAge = null;
        v.maxAge = null;
        this.filterDataChanged.emit(v);
      } else {
        this.filterDataChanged.emit(v);
      }
    });
  };

  @Input() set data(val: any) {
    this.form.patchValue(mapToSearchToyFilterFormModel(val), { emitEvent: false });
  }

  protected toggleFiltersEvent() {
    this.isFilterOpen.set(!this.isFilterOpen());
  }

  protected selectAgeEvent(cat: CategoryModel): void {
    this.form.patchValue({ minAge: cat.minAge, maxAge: cat.maxAge});
  }
}

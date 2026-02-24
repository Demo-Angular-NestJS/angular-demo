/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectionStrategy, Component, inject, input, Input } from '@angular/core';
import { FormBaseComponent } from '@c/shared/form-base.component';
import { FormDefaultsModule } from '@c/shared/form-defaults.module';
import { getGroup } from '@u/generic';
import { editToyForm, EditToyFormModel } from './edit-toy-form.model';
import { mapToEditToyFormModel } from './edit-toy-form.mapper';
import { CategoriesService } from '@data/services';
import { provideTranslation } from '@u/helper';
import { TranslationLanguageEnum } from 'app/enum';


@Component({
  standalone: true,
  selector: 'app-edit-toy-form',
  templateUrl: './edit-toy-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideTranslation('editToyForm', (lang: TranslationLanguageEnum) => import(`./i18n/${lang}.json`))],
  imports: [
    FormDefaultsModule,
  ]
})
export class EditToyFormComponent extends FormBaseComponent<EditToyFormModel> {
  networkActive = input<boolean>(false);

  public form = getGroup(editToyForm);
  protected categoriesService = inject(CategoriesService);

  constructor() {
    super();
    this.initFormListeners();
  };

  @Input() set data(val: any) {
    this.form.patchValue(mapToEditToyFormModel(val), { emitEvent: false });
  }

  protected addTagEvent(tag: string) {
    if (tag.trim()) {
      const control = this.field('tags');
      control.patchValue([...(control.value || []), tag.trim()]);
    }
  }

  protected removeTagEvent(index: number) {
    const control = this.field('tags');
    const currentTags = (control.value || []) as string[];
    const updatedTags = currentTags.filter((_, i) => i !== index);

    control.patchValue(updatedTags);
  }
}

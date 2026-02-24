/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectionStrategy, Component, input, Input, signal } from '@angular/core';
import { FormBaseComponent } from '@c/shared/form-base.component';
import { FormDefaultsModule } from '@c/shared/form-defaults.module';
import { getGroup } from '@u/generic';
import { editToyImagesForm, EditToyImagesFormModel } from './edit-toy-images-form.model';
import { mapToEditToyImagesFormModel } from './edit-toy-images-form.mapper';
import { provideTranslation } from '@u/helper';
import { TranslationLanguageEnum } from 'app/enum';


@Component({
  standalone: true,
  selector: 'app-edit-toy-images-form',
  templateUrl: './edit-toy-images-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideTranslation('editToyImageForm', (lang: TranslationLanguageEnum) => import(`./i18n/${lang}.json`))],
  imports: [
    FormDefaultsModule,
  ]
})
export class EditToyImagesFormComponent extends FormBaseComponent<EditToyImagesFormModel> {
  networkActive = input<boolean>(false);

  public form = getGroup(editToyImagesForm);
  protected showUrlInput = signal(false);

  constructor() {
    super();
    this.initFormListeners();
  };

  @Input() set data(val: any) {
    this.form.patchValue(mapToEditToyImagesFormModel(val), { emitEvent: false });
  }

  protected showUrlInputEvent(): void {
    this.showUrlInput.set(!this.showUrlInput());

    if (!this.showUrlInput()) {
      this.field('imageForGallery').setValue(null);
      this.field('imageForGallery').clearAsyncValidators();
    }
  }

  protected addOnAddGalleryEvent() {
    const control = this.field('imageUrls');
    const images: string[] = control.value || [];

    images.push(this.field('imageForGallery').value);
    control.patchValue(images);
    this.field('imageForGallery').setValue(null);
    this.showUrlInput.set(false);
  }

  protected removeImageGalleryEvent(index:number): void {
    const control = this.field('imageUrls');
    let images: string[] = control.value || [];

    images = images.filter((_, i) => i !== index);
    control.patchValue(images);
  }
}

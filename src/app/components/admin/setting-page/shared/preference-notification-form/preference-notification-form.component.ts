/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectionStrategy, Component, Input, output } from '@angular/core';
import { FormBaseComponent } from '@c/shared/form-base.component';
import { FormDefaultsModule } from '@c/shared/form-defaults.module';
import { preferenceNotificationForm, PreferenceNotificationFormModel } from './preference-notification-form.model';
import { getGroup } from '@u/generic';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { mapToPreferenceNotificationFormModel } from './preference-notification-form.mapper';
import { DEBOUNCE_TIME_MS } from '@constants';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { provideTranslation } from '@u/helper';
import { TranslationLanguageEnum } from 'app/enum';

@Component({
  standalone: true,
  selector: 'app-preference-notification-form',
  templateUrl: './preference-notification-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideTranslation('preferenceNotificationForm', (lang: TranslationLanguageEnum) => import(`./i18n/${lang}.json`))],
  imports: [
    FormDefaultsModule,
  ]
})
export class PreferenceNotificationFormComponent extends FormBaseComponent<PreferenceNotificationFormModel> {
  formDataChanged = output<PreferenceNotificationFormModel>();

  public form = getGroup(preferenceNotificationForm);

  constructor() {
    super();
    this.initFormListeners();

    this.form.valueChanges.pipe(
      takeUntilDestroyed(),
      debounceTime(DEBOUNCE_TIME_MS),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
    ).subscribe((data) => this.formDataChanged.emit(data));
  };

  @Input() set data(val: any) {
    this.form.patchValue(mapToPreferenceNotificationFormModel(val), { emitEvent: false });
  }
}

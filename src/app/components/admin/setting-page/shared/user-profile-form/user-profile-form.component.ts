/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, input, Input, output } from '@angular/core';
import { FormBaseComponent } from '@c/shared/form-base.component';
import { FormDefaultsModule } from '@c/shared/form-defaults.module';
import { getGroup } from '@u/generic';
import { userProfileForm, UserProfileFormModel } from './user-profile-form.model';
import { mapToUserProfileFormModel } from './user-profile-form.mapper';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs';
import { DEBOUNCE_TIME_MS, searchChangePasswordRoute } from '@constants';
import { UserHelperService } from '@s/user-helper.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { provideTranslation } from '@u/helper';
import { TranslationLanguageEnum } from 'app/enum';

@Component({
  standalone: true,
  selector: 'app-user-profile-form',
  templateUrl: './user-profile-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideTranslation('userProfileForm', (lang: TranslationLanguageEnum) => import(`./i18n/${lang}.json`))],
  imports: [
    FormDefaultsModule,
  ]
})
export class UserProfileFormComponent extends FormBaseComponent<UserProfileFormModel> implements AfterViewInit {
  networkActive = input<boolean>(false);
  submitData = output<UserProfileFormModel>();

  public form = getGroup(userProfileForm);
  protected searchChangePasswordRoute = searchChangePasswordRoute;

  private _currentUserName!: string;
  private _userHelperService = inject(UserHelperService);
  private _destroyRef = inject(DestroyRef);
  private _cdr = inject(ChangeDetectorRef);

  constructor() {
    super();
    this.initFormListeners();
  };

  @Input() set data(val: any) {
    this._currentUserName = (val?.userName ?? '').toLowerCase();
    this.form.patchValue(mapToUserProfileFormModel(val), { emitEvent: false });
  }

  ngAfterViewInit(): void {
    this.alreadyExistValidation();
  }

  private alreadyExistValidation(): void {
    const ctrlUserName = this.field('userName');

    ctrlUserName.valueChanges.pipe(
      debounceTime(DEBOUNCE_TIME_MS),
      distinctUntilChanged(),
      filter((v: string) => !!v && v.toLowerCase() !== this._currentUserName && !ctrlUserName.hasError('required')),
      tap(() => {
        ctrlUserName.setErrors({ checking: true });
        this._cdr.markForCheck();
      }),
      switchMap((userName) => this._userHelperService.exists({ userName })),
      takeUntilDestroyed(this._destroyRef)
    ).subscribe({
      next: (resp) => {
        ctrlUserName.setErrors(resp?.userNameExist ? { alreadyExists: true } : null);
        this._cdr.markForCheck();
      },
      error: () => {
        ctrlUserName.setErrors({ serverError: true });
        this._cdr.markForCheck();
      }
    });
  }
}

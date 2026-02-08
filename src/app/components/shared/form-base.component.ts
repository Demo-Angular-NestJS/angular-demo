/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, input, output, viewChild, signal, computed, effect } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, FormGroupDirective } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { FORM_BASE_SETTINGS } from './form-base.toke';
import { FormBaseSettingsModel } from '@m/form-base-settings.model';
import { maskMaxIntDigitsHelper, maskSeparator } from '@constants';
import { markFormControlsTouchedHelper, objEqualWithEcxeptions } from '@u/helper';
import { FormGroupG } from '@u/generic';

const defaultOptions: FormBaseSettingsModel = {
  watchChanges: false,
  ignoreWatchFields: [],
};

@Component({
  template: '',
  providers: [{ provide: FORM_BASE_SETTINGS, useValue: defaultOptions }]
})
export abstract class FormBaseComponent<TModel extends Record<string, any>> {
  //Inject dependencies
  protected readonly fbDirective = viewChild(FormGroupDirective);
  protected readonly injectedSettings = inject(FORM_BASE_SETTINGS, { optional: true });

  //Outputs
  readonly okEvent = output<TModel>();
  readonly resetEvent = output<boolean>();
  readonly clearEvent = output<boolean>();

  // Inputs
  value = input<TModel | undefined>(undefined);

  //Signals for State Management
  public readonly isSubmitting = signal(false);
  public readonly isDisabled = signal(false);
  private readonly _changed = signal(false);

  //Computed signals
  public readonly changed = computed(() => this._changed());

  //Protected Properties
  protected readonly destroy$ = new Subject<void>();
  protected readonly settings: FormBaseSettingsModel;
  protected readonly maskMaxInt = maskMaxIntDigitsHelper;
  protected readonly maskSeparator = maskSeparator;

  public abstract form: FormGroupG<TModel>;

  private startValue!: TModel;

  constructor() {
    this.settings = { ...defaultOptions, ...this.injectedSettings };

    // Effect to handle the 'value'
    effect(() => {
      const val = this.value();
      if (val && this.form) {
        this.startValue = val;
        this.form.patchValue(val, { emitEvent: false });
      }
    });
  }

  /**
   * Initialize logic that requires the 'form' to exist
   */
  protected initFormListeners(): void {
    this.startValue = this.form.getRawValue();

    if (this.settings.watchChanges) {
      this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe((value: any) => {
        const hasChanged = !objEqualWithEcxeptions(value, this.startValue, this.settings.ignoreWatchFields);
        this._changed.set(hasChanged);
      });
    }
  }

  // Helper for current value with validation
  public get validatedValue(): TModel | null {
    if (this.form.invalid) {
      this.showErrors();
      return null;
    }
    return this.form.getRawValue() as TModel;
  }

  public onSubmit(): void {
    const val = this.validatedValue;
    if (val) {
      this.okEvent.emit(val);
    }
  }

  // --- Field Helpers ---
  public field(name: string, subGroup?: string): AbstractControl {
    let group: FormGroup = this.form;
    if (subGroup) {
      const g = group.get(subGroup) as FormGroup;
      if (!g) throw new Error(`Group '${subGroup}' not found`);
      group = g;
    }
    const control = group.get(name);
    if (!control) throw new Error(`Field '${name}' not found`);
    return control;
  }

  public array<TGroup extends Record<string, any> = any>(
    name: string,
    subGroup?: string
  ): FormArray<FormGroupG<TGroup>> {
    return this.field(name, subGroup) as FormArray<FormGroupG<TGroup>>;
  }

  public isError(fieldName: string, error: string, subGroup?: string): boolean {
    const control = this.field(fieldName, subGroup);
    return control.invalid && control.touched && !!control.errors?.[error];
  }

  public showErrors(): void {
    markFormControlsTouchedHelper(this.form);
  }

  public resetForm(): void {
    this.fbDirective()?.resetForm(this.startValue);
    this._changed.set(false);
    this.resetEvent.emit(true);
  }

  public clearForm(defaultModel: Partial<TModel> = {}): void {
    this.fbDirective()?.resetForm(defaultModel);
    this._changed.set(false);
    this.clearEvent.emit(true);
  }

  public disableForm(options?: { onlySelf?: boolean; emitEvent?: boolean }): void {
    this.form.disable(options);
    this.isDisabled.set(true);
  }

  public enableForm(options?: { onlySelf?: boolean; emitEvent?: boolean }): void {
    this.form.enable(options);
    this.isDisabled.set(false);
  }
}

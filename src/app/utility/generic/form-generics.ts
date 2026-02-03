/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

interface ExtendedState<TFieldValue> {
  value: TFieldValue;
  disabled?: boolean;
}

type FormControlStateG<TFieldValue> = ExtendedState<TFieldValue> | TFieldValue;

type ValidatorG = ValidatorFn | ValidatorFn[] | AbstractControlOptions | null;
type AsyncValidatorG = AsyncValidatorFn | AsyncValidatorFn[] | null;

export class FormControlG<TFieldValue> extends FormControl {
  // 'declare' tells TS: "The base class already has this, but I'm refining the type"
  declare value: TFieldValue;

  constructor(
    state: TFieldValue | FormControlStateG<TFieldValue> = null as any,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(state, validatorOrOpts, asyncValidator);
  }
}

type Controls<E> = {
  [K in keyof E]: FormControlG<E[K]>;
};

export class FormGroupG<TFormValue extends Record<string, any>> extends FormGroup {
  declare readonly value: TFormValue;
  declare readonly valueChanges: Observable<TFormValue>;
  declare controls: Controls<TFormValue>;

  constructor(
    controls: Controls<TFormValue>,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(controls, validatorOrOpts, asyncValidator);
  }

  /**
   * Proficiency Tip: Add a typed getRawValue
   */
  override getRawValue(): TFormValue {
    return super.getRawValue() as TFormValue;
  }
}

interface SimpleControlInfo<TValue> {
  v?: TValue;
  vldtr?: ValidatorG;
  avldtr?: AsyncValidatorG;
}

export type ControlInfo<E> = {
  [K in keyof E]: SimpleControlInfo<E[K]> | AbstractControl;
};

export const getGroup = <TFormvalue extends Record<string, any>>(
  info: ControlInfo<TFormvalue>,
  validatorOrOpts?: ValidatorG,
  asyncValidator?: AsyncValidatorG
): FormGroupG<TFormvalue> => {
  const controls = {} as Controls<TFormvalue>;

  // Use Object.keys with a type cast to ensure the key is treated as a property of TFormvalue
  (Object.keys(info) as (keyof TFormvalue)[]).forEach((key) => {
    const controlData = info[key];

    if (controlData instanceof AbstractControl) {
      // Use 'any' or a specific cast here because TS cannot 100%
      // correlate the union types of keys and values during a loop
      controls[key] = controlData as any;
    } else {
      const value = controlData.v ?? '';

      // Explicitly cast to 'any' to satisfy the strict Controls<T> type
      controls[key] = new FormControlG(
        value,
        controlData.vldtr,
        controlData.avldtr
      ) as any;
    }
  });

  return new FormGroupG<TFormvalue>(controls, validatorOrOpts, asyncValidator);
};

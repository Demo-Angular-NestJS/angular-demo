/* eslint-disable @angular-eslint/directive-selector */
import { ChangeDetectorRef, Directive, effect, inject, input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[tDisable]',
  standalone: true,
})
export class TDisableDirective {
  tDisable = input<boolean>(false);

  private ngControl = inject(NgControl);
  private cdr = inject(ChangeDetectorRef);

  constructor() {
    effect(() => {
      const isDisabled = this.tDisable();
      const control = this.ngControl.control;

      if (control) {
        // 1. Update the control state
        if (isDisabled && control.enabled) {
          control.disable({ emitEvent: false });
        } else if (!isDisabled && control.disabled) {
          control.enable({ emitEvent: false });
        }

        // 2. Force the UI to reflect the change immediately
        this.cdr.markForCheck();
      }
    });
  }
}

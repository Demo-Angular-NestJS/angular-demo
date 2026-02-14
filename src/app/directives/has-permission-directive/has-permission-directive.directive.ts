/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CurrentUserService } from '@data/services';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Directive({
  selector: '[hasPermission]',
  standalone: true
})
export class HasPermissionDirective {
  private currentUserService = inject(CurrentUserService);
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);

  @Input('hasPermission') permission!: string;

  private isVisible = false;

  constructor() {
    this.currentUserService.current$.pipe(
      map((user) => {
        if (!user) {
          return false;
        }

        return user.isAdmin;
      }),
      distinctUntilChanged(),
      takeUntilDestroyed()
    ).subscribe(hasAccess => {
      this.updateView(hasAccess);
    });
  }

  private updateView(hasAccess: boolean): void {
    if (hasAccess && !this.isVisible) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.isVisible = true;
    } else if (!hasAccess && this.isVisible) {
      this.viewContainer.clear();
      this.isVisible = false;
    }
  }
}

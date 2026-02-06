import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, OnDestroy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AdminLayoutComponent } from '@c/layout';
import { CurrentUserService } from '@data/services';
import { PageBreadCrumbModel } from '@m/page-bread-crumb.model';
import { PropInitialsModule } from 'app/pipe';
import { DisableFormDirectiveModule } from "@d/disable-form-directive";

@Component({
  standalone: true,
  selector: 'app-setting-page',
  templateUrl: './setting-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    PropInitialsModule,
    MatFormFieldModule,
    MatInputModule,
    DisableFormDirectiveModule
]
})
export class SettingPageComponent implements OnDestroy {
  protected currentUserService = inject(CurrentUserService);
  protected adminLayout = inject(AdminLayoutComponent);

  protected currentUser = toSignal(this.currentUserService.current$, { initialValue: null });

  constructor() {
    this.adminLayout.breadCrumbs.set(defaultBreadCrumbs);
  }

  ngOnDestroy(): void {
    this.adminLayout.breadCrumbs.set([]);
  }
}

const defaultBreadCrumbs: PageBreadCrumbModel[] = [
  { title: 'Settings', url: null, svgIcon: 'settings' },
];

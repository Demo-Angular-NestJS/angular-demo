import { Component, DestroyRef, inject, OnDestroy, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminLayoutComponent } from "@c/layout";
import { CurrentFavouritesService, CurrentUserConfigurationService, CurrentUserService } from "@data/services";
import { UserConfigurationModel, UserModel } from "@m/class";
import { GlobalStateService } from "@s/common";
import { ToastrService } from "ngx-toastr";

@Component({
  template: '',
})
export abstract class BaseComponent implements OnDestroy {
  protected readonly globalStateService = inject(GlobalStateService);
  protected readonly currentFavouritesService = inject(CurrentFavouritesService);
  protected readonly currentUserService = inject(CurrentUserService);
  protected readonly currentUserConfigService = inject(CurrentUserConfigurationService);
  protected readonly adminLayout = inject(AdminLayoutComponent, { optional: true });
  protected readonly toastr = inject(ToastrService);
  protected readonly router = inject(Router);
  protected readonly route = inject(ActivatedRoute);
  protected readonly destroyRef = inject(DestroyRef);

  protected networkActive = signal(false);
  protected readonly currentUser = toSignal(this.currentUserService.current$, { initialValue: new UserModel({}) });
  protected readonly currentUserConfig = toSignal(this.currentUserConfigService.current$, { initialValue: new UserConfigurationModel({}) });


  ngOnDestroy(): void {
    this.adminLayout?.breadCrumbs.set([]);
  }
}

import { Component, DestroyRef, inject, OnDestroy, signal } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminLayoutComponent } from "@c/layout";
import { ToastrService } from "ngx-toastr";

@Component({
  template: '',
})
export abstract class BaseComponent implements OnDestroy {
  protected networkActive = signal(false);

  protected adminLayout = inject(AdminLayoutComponent, { optional: true });
  protected toastr = inject(ToastrService);
  protected router = inject(Router);
  protected route = inject(ActivatedRoute);
  protected destroyRef = inject(DestroyRef);

  ngOnDestroy(): void {
      this.adminLayout?.breadCrumbs.set([]);
  }
}

import { inject, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class IconsService {
  private readonly registry = inject(MatIconRegistry);
  private readonly sanitizer = inject(DomSanitizer);

  public init(): void {
    // Register icon sets
    this.addIcon('home', 'assets/icons/home.svg');
    this.addIcon('right-direction', 'assets/icons/right-direction.svg');
    this.addIcon('toy', 'assets/icons/toy.svg');
    this.addIcon('favorite', 'assets/icons/favorite.svg');
    this.addIcon('purchase', 'assets/icons/purchase.svg');
    this.addIcon('settings', 'assets/icons/settings.svg');
    this.addIcon('singOut', 'assets/icons/singOut.svg');
    this.addIcon('user_account', 'assets/icons/user-account.svg');
    this.addIcon('security_padlock', 'assets/icons/security-padlock.svg');
    this.addIcon('preferences', 'assets/icons/preferences.svg');
    this.addIcon('verified_account', 'assets/icons/verified-account.svg');
    this.addIcon('payment_method', 'assets/icons/payment-method.svg');
    // this._matIconRegistry.addSvgIconSetInNamespace(
    //     'mat_outline',
    //     this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/material-outline.svg')
    // );
  }

  public addIcon(name: string, url: string): void {
    this.registry.addSvgIcon(name, this.sanitizer.bypassSecurityTrustResourceUrl(url));
  }
}

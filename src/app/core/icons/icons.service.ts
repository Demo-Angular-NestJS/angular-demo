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
    this.addIcon('right_direction', 'assets/icons/right-direction.svg');
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
    this.addIcon('link', 'assets/icons/link.svg');
    this.addIcon('close', 'assets/icons/close.svg');
    this.addIcon('plus', 'assets/icons/plus.svg');
    this.addIcon('cube', 'assets/icons/cube.svg');
    this.addIcon('star', 'assets/icons/star.svg');
    this.addIcon('heart', 'assets/icons/heart.svg');
    this.addIcon('pencil', 'assets/icons/pencil.svg');
    this.addIcon('secure_key', 'assets/icons/secure-key.svg');
    this.addIcon('arrow_left', 'assets/icons/arrow-left.svg');
    this.addIcon('at_sign', 'assets/icons/at-sign.svg');
    // this._matIconRegistry.addSvgIconSetInNamespace(
    //     'mat_outline',
    //     this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/material-outline.svg')
    // );
  }

  public addIcon(name: string, url: string): void {
    this.registry.addSvgIcon(name, this.sanitizer.bypassSecurityTrustResourceUrl(url));
  }
}

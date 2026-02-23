import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseComponent } from '@c/shared/base.component';
import { PageBreadCrumbModel } from '@m/page-bread-crumb.model';
import { TranslocoModule } from '@ngneat/transloco';
import { provideTranslation } from '@u/helper';
import { TranslationLanguageEnum } from 'app/enum';

@Component({
  standalone: true,
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideTranslation('homePage', (lang: TranslationLanguageEnum) => import(`./i18n/${lang}.json`))],
  imports: [
    CommonModule,
    TranslocoModule,
  ],
})
export class HomePageComponent extends BaseComponent {
  constructor() {
    super();
    this.adminLayout?.breadCrumbs.set(breadCrumbs);
  }
}

const breadCrumbs: PageBreadCrumbModel[] = [
  { title: 'homePage.Home', url: null, svgIcon: 'home' },
  { title: 'homePage.Welcome', url: null }
];

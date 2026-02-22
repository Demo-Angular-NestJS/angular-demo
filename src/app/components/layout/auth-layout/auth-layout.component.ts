import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChooseLanguageComponent } from '@c/common';

@Component({
  standalone: true,
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    ChooseLanguageComponent,
  ],
})
export class AuthLayoutComponent {

}

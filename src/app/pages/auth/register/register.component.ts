import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { searchSignInRoute } from '@constants';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class RegisterComponent {
    protected searchSignInRoute = searchSignInRoute;
}

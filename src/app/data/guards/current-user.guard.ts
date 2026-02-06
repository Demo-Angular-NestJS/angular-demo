import { CanActivateFn } from '@angular/router';
import { requiredDataGuard } from '@data/guards';
import { CurrentUserService } from '@data/services';

export const currentUserGuard: CanActivateFn = requiredDataGuard(CurrentUserService);

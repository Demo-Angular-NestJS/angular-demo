import { CanActivateFn } from '@angular/router';
import { requiredDataGuard } from '@data/guards';
import { CurrentUserConfigurationService } from '@data/services';

export const currentUserConfigurationGuard: CanActivateFn = requiredDataGuard(CurrentUserConfigurationService);

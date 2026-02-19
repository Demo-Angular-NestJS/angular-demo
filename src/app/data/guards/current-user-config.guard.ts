import { CanActivateFn } from '@angular/router';
import { requiredDataGuard } from '@data/guards';
import { CurrentUserConfigurationService } from '@data/services';

export const currentUserConfigurationGuard = (forceRefresh = false): CanActivateFn => {
  return (route, state) => {
    return requiredDataGuard(CurrentUserConfigurationService, forceRefresh)(route, state);
  };
};

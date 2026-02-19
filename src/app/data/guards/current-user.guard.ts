import { CanActivateFn } from '@angular/router';
import { requiredDataGuard } from '@data/guards';
import { CurrentUserService } from '@data/services';

export const currentUserGuard = (forceRefresh = false): CanActivateFn => {
  return (route, state) => {
    return requiredDataGuard(CurrentUserService, forceRefresh)(route, state);
  };
};

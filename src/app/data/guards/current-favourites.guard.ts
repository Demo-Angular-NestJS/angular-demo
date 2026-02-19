import { CanActivateFn } from '@angular/router';
import { requiredDataGuard } from '@data/guards';
import { CurrentFavouritesService } from '@data/services';

export const currentFavouritesGuard = (forceRefresh = false): CanActivateFn => {
  return (route, state) => {
    return requiredDataGuard(CurrentFavouritesService, forceRefresh)(route, state);
  };
};

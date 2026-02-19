import { CanActivateFn } from '@angular/router';
import { requiredDataGuard } from '@data/guards';
import { CategoriesService } from '@data/services';

export const categoriesGuard = (forceRefresh = false): CanActivateFn => {
  return (route, state) => {
    return requiredDataGuard(CategoriesService, forceRefresh)(route, state);
  };
};

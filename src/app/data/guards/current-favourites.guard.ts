import { CanActivateFn } from '@angular/router';
import { requiredDataGuard } from '@data/guards';
import { CurrentFavouritesService } from '@data/services';

export const currentFavouritesGuard: CanActivateFn = requiredDataGuard(CurrentFavouritesService);

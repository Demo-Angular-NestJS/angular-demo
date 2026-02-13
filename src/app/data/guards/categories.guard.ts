import { CanActivateFn } from '@angular/router';
import { requiredDataGuard } from '@data/guards';
import { CategoriesService } from '@data/services';

export const categoriesGuard: CanActivateFn = requiredDataGuard(CategoriesService);

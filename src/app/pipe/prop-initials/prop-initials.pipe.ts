import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'propInitials',
  standalone: true
})
export class PropInitialsPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';

    const parts = value.trim().split(/\s+/);

    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }

    const firstInitial = parts[0].charAt(0);
    const lastInitial = parts[parts.length - 1].charAt(0);

    return (firstInitial + lastInitial).toUpperCase();
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lookupMap',
  standalone: true,
  pure: true
})
export class LookupMapPipe implements PipeTransform {
  /**
   * @param id The key to look up in the map
   * @param map The Record object containing the data
   * @param fallback The string to return if the key/property isn't found
   * @param property The specific property to pluck (defaults to 'name')
   */
  transform(
    id: string | number | undefined | null,
    map: Record<string | number, any>,
    property = 'name',
    fallback = 'Unknown'
  ): string {
    if (!id || !map || !map[id]) {
      return fallback;
    }

    return map[id][property] ?? fallback;
  }
}

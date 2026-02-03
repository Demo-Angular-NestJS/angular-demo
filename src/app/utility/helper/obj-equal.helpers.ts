/* eslint-disable @typescript-eslint/no-explicit-any */
export const objEqualWithJson = <T>(a: T, b: T): boolean => JSON.stringify(a) === JSON.stringify(b);
export const objEqualWithEcxeptions = <T extends Record<string, any>>(
  a: T,
  b: T,
  exceptFields: readonly (keyof T | string)[] = []
): boolean => {
  // Convert readonly array to a Set for O(1) lookup performance
  const exceptions = new Set(exceptFields as string[]);

  return Object.keys(a)
    .filter((key) => !exceptions.has(key))
    .every((key) => a[key] === b[key]);
};

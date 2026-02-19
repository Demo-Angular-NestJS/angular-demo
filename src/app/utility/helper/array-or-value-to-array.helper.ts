/* eslint-disable @typescript-eslint/no-explicit-any */
export const arrayOrValueToArray = <T>(value: T | T[]): T[] => {
  if (Array.isArray(value)) {
    return value;
  }

  return value !== null && value !== undefined ? [value] : [];
};

export const arrayToRecord = <T extends object>(key: keyof T, values: T[]): Record<string | number, T> => {
  const result: Record<string | number, T> = {};

  for (const item of (values || [])) {
    const id = item[key];
    if (id != null) {
      result[id as any] = { ...item };
    }
  }

  return result;
};

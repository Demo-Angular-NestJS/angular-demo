export const arrayOrValueToArray = <T>(value: T | T[]): T[] => {
  if (Array.isArray(value)) {
    return value;
  }

  return value !== null && value !== undefined ? [value] : [];
};

export const arrayToRecord = <T>(key: keyof T, values: T[]): Record<string | number, T> => {
  return (values || []).reduce((records, item) => {
    const keyValue = item[key];

    if (keyValue !== undefined && keyValue !== null) {
      records[keyValue as unknown as string | number] = item;
    }

    return records;
  }, {} as Record<string | number, T>);
};

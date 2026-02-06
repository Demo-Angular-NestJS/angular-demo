export type FilterField<E> = {
  [K in keyof E]: E[K] | readonly E[K][];
};

export const universalFilterFunc = <T>(
  entities: T[],
  pattern: Partial<FilterField<T>>
): T[] => {
  const criteria = Object.entries(pattern) as [keyof T, T[keyof T]][];

  return entities.filter((entity) =>
    criteria.every(([key, allowedValues]) => {
      const entityValue = entity[key];

      if (Array.isArray(allowedValues)) {
        return allowedValues.includes(entityValue);
      }

      return entityValue === allowedValues;
    })
  );
};

export const getIntOrDefault: (source: string, defaults: number) => number =
  (source: string, defaults = 0) => {
    const parced = parseInt(source, 10);
    return isNaN(parced) ? defaults : parced;
  };

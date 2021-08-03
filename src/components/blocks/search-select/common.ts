export type ValueGetter<T> = (item: T) => string;
export type FetchItems<T> = (query: string) => Promise<Array<T>>;

export const getItem = <T>(
  items: Array<T>,
  getValue: ValueGetter<T>,
  value: string
): T | undefined => items.find((item) => getValue(item) === value);

export const getPrevious = <T>(
  items: Array<T>,
  getValue: ValueGetter<T>,
  value: string
): T => {
  const prevIndex = items.findIndex((item) => getValue(item) === value) - 1;
  return items[Math.max(0, prevIndex)];
};
export const getNext = <T>(
  items: Array<T>,
  getValue: ValueGetter<T>,
  value: string
): T => {
  const nextIndex = items.findIndex((item) => getValue(item) === value) + 1;
  return items[Math.min(items.length - 1, nextIndex)];
};

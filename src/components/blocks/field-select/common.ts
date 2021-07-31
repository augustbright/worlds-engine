export type Item = {
  value: string;
  title: string;
};

export const getItem = (items: Array<Item>, value: string) =>
  items.find((item) => item.value === value);
export const getTitle = (items: Array<Item>, value: string) =>
  getItem(items, value)?.title;
export const getPrevious = (items: Array<Item>, value: string) => {
  const prevIndex = items.findIndex((item) => item.value === value) - 1;
  return items[Math.max(0, prevIndex)];
};
export const getNext = (items: Array<Item>, value: string) => {
  const nextIndex = items.findIndex((item) => item.value === value) + 1;
  return items[Math.min(items.length - 1, nextIndex)];
};

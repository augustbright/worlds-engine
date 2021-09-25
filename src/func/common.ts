export const joinListsWithSeparator = <S, I>(
  separator: S,
  ...lists: Array<Array<I>>
): Array<I | S> => {
  let result: Array<I | S> = [];
  const filteredLists = lists.filter((list) => list.length > 0);
  filteredLists.forEach((list, index) => {
    result = [...result, ...list];
    if (index !== filteredLists.length - 1) {
      result.push(separator);
    }
  });
  return result;
};

export const assertNever = (never: never) => never;

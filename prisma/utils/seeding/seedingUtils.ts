export const getRandomIndex = <T>(arr: T[]) => {
  if (arr.length === 0) {
    throw new Error("No items in array. Can't fetch random array");
  }

  return arr[Math.floor(Math.random() * arr.length)];
};

export const generateRandomList = <T>(n: number, arr: T[]): T[] => {
  if (n <= 0) {
    throw new Error("List size must be greater than 0");
  }

  const uniqueValues = new Set<T>();
  const result: T[] = [];

  while (result.length < n) {
    const value = getRandomIndex<T>(arr);

    if (!value) throw new Error("Cannot generate random list");
    if (!uniqueValues.has(value)) {
      uniqueValues.add(value);
      result.push(value);
    }
  }

  return result;
};

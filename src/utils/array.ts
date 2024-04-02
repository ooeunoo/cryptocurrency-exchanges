export const sortBy = (array: Record<string, unknown>[], key: string): Record<string, unknown>[] => {
  return array.sort((a, b) => {
    const timestampA: number = a[key] as number;
    const timestampB: number = b[key] as number;

    return timestampA - timestampB;
  });
};

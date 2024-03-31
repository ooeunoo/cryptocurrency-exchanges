export const sortBy = (array: any[], key: string) => {
  return array.sort((a, b) => {
    const timestampA: number = a[key];
    const timestampB: number = b[key];

    return timestampA - timestampB;
  });
};

export const toTimestamp = (time?: string): number => {
  if (time == null) return null;
  return new Date(time).getTime();
};

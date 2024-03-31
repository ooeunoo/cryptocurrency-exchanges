export const toTimestamp = (time?: string): number => {
  if (time == null || time == undefined) return null;
  return new Date(time).getTime();
};


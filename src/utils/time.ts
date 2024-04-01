export const toTimestamp = (time?: string): number | null => {
  if (time == null || time == undefined) return null;
  return new Date(time).getTime();
};

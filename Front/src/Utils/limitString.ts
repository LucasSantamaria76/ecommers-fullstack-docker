export const limitString = (str: string | undefined, length: number): string | undefined => {
  if (str && str.length > length) return str?.slice(0, length - 3).concat('...');
  return str;
};

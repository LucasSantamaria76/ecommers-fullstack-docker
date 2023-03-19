export const limitString = (str: string, length: number) => {
  if (str.length > length) return str.slice(0, length - 3).concat('...');
  return str;
};

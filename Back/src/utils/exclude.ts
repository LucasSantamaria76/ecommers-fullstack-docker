export function exclude<T, Key extends keyof T>(data: T, keys: Key[]): Omit<T, Key> {
  for (let key of keys) {
    delete data[key];
  }
  return data;
}

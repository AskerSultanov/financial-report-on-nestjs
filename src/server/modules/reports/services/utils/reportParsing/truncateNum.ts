var hasDot = (num: number): boolean => num.toString().split('').includes('.');

export function truncateNum(value: number): number {
  if (!hasDot(value)) {
    return value;
  }

  return +value.toFixed(2);
}

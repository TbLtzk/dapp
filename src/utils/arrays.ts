export function fillArray (length: number): number[] {
  return new Array(length).fill(0).map((_, i) => i);
};

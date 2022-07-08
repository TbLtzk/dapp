
export enum Breakpoints {
  huge = '1440px',
  large = '1200px',
  medium = '768px',
  small = '480px',
};
type BreakpointType = keyof typeof Breakpoints

function lessThan (bp: BreakpointType) {
  return `@media (max-width: ${Breakpoints[bp]})`;
}

function greaterThan (bp: BreakpointType) {
  return `@media (min-width: ${Breakpoints[bp]})`;
}

function between (minBp: BreakpointType, maxBp: BreakpointType) {
  return `@media (min-width: ${Breakpoints[minBp]}) and (max-width: ${Breakpoints[maxBp]})`;
}

export const media = {
  lessThan,
  greaterThan,
  between,
};

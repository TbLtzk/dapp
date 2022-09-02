
export enum Breakpoints {
  huge = 1600,
  large = 1440,
  medium = 1024,
  tablet = 600,
  small = 480,
};
type BreakpointType = keyof typeof Breakpoints;

function lessThan (bp: BreakpointType) {
  return `@media (max-width: ${Breakpoints[bp] - 1}px)`;
}

function greaterThan (bp: BreakpointType) {
  return `@media (min-width: ${Breakpoints[bp] + 1}px)`;
}

function between (minBp: BreakpointType, maxBp: BreakpointType) {
  return `@media (min-width: ${Breakpoints[minBp]}px) and (max-width: ${Breakpoints[maxBp]}px)`;
}

export const media = {
  lessThan,
  greaterThan,
  between,
};

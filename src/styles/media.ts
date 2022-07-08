
export enum Breakpoints {
  huge = 1600,
  large = 1200,
  medium = 768,
  small = 480,
};
type BreakpointType = keyof typeof Breakpoints

function lessThan (bp: BreakpointType) {
  return `@media (max-width: ${Breakpoints[bp]}px)`;
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

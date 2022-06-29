import { DefaultTheme } from 'styled-components';
import { COLORS, getColorFn } from 'styles/colors';

export const darkColors = {
  bg: COLORS.blue700,
  bgActive: COLORS.grey100,
  text: COLORS.grey300,
  textActive: COLORS.blue800,
  focus: COLORS.blue000,
  focusActive: COLORS.blue800,
};

export const lightColors = {
  bg: COLORS.grey000,
  bgActive: COLORS.blue800,
  text: COLORS.grey500,
  textActive: COLORS.white,
  focus: COLORS.blue100,
  focusActive: COLORS.blue100,
};

export type SegmentedButtonColorType = keyof typeof darkColors | keyof typeof lightColors;

export function getSegmentedButtonColor (theme: DefaultTheme, key: SegmentedButtonColorType): string {
  return getColorFn(theme, { lightColors, darkColors })(key);
}

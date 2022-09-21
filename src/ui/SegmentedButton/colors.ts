import { DefaultTheme } from 'styled-components';
import { COLORS, getColorFn } from 'styles/colors';

export const darkColors = {
  bg: COLORS.blue700,
  bgLight: COLORS.blue800,
  bgActive: COLORS.grey100,
  text: COLORS.grey300,
  textActive: COLORS.blue800,
  focus: COLORS.blue000,
  focusActive: COLORS.blue800,
};

export const lightColors = {
  bg: COLORS.grey000,
  bgLight: COLORS.white,
  bgActive: COLORS.blue800,
  text: COLORS.grey500,
  textActive: COLORS.white,
  focus: COLORS.blue100,
  focusActive: COLORS.blue100,
};

export function getSegmentedButtonColor (
  theme: DefaultTheme,
  key: keyof typeof darkColors | keyof typeof lightColors
): string {
  return getColorFn(theme, { lightColors, darkColors })(key);
}

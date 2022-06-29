import { DefaultTheme } from 'styled-components';
import { COLORS, getColorFn } from 'styles/colors';

export const darkColors = {
  label: COLORS.grey100,
  labelDisabled: COLORS.grey700,
  frame: COLORS.grey100,
  frameHover: COLORS.grey300,
  frameDisabled: COLORS.grey700,
  focusOutline: COLORS.blue000,
  icon: COLORS.blue800,
  iconDisabled: COLORS.grey300,
};

export const lightColors = {
  label: COLORS.blue800,
  labelDisabled: COLORS.grey200,
  frame: COLORS.blue800,
  frameHover: COLORS.blue600,
  frameDisabled: COLORS.grey200,
  focusOutline: COLORS.blue100,
  icon: COLORS.white,
  iconDisabled: COLORS.white,
};

export type CheckColorType = keyof typeof darkColors | keyof typeof lightColors;

export function getCheckColor (theme: DefaultTheme, key: CheckColorType): string {
  return getColorFn(theme, { lightColors, darkColors })(key);
}

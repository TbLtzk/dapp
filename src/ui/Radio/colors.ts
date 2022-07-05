import { DefaultTheme } from 'styled-components';
import { COLORS, getColorFn } from 'styles/colors';

export const darkColors = {
  label: COLORS.grey100,
  labelDisabled: COLORS.grey700,
  frame: COLORS.grey100,
  frameHover: COLORS.grey300,
  frameDisabled: COLORS.grey700,
  focusOutline: COLORS.blue000,
  border: COLORS.grey600,
  borderActive: COLORS.grey000,
  tip: COLORS.grey300,
};

export const lightColors = {
  label: COLORS.blue800,
  labelDisabled: COLORS.grey200,
  frame: COLORS.blue800,
  frameHover: COLORS.blue600,
  frameDisabled: COLORS.grey200,
  focusOutline: COLORS.blue100,
  border: COLORS.grey300,
  borderActive: COLORS.blue800,
  tip: COLORS.grey600,
};

export function getRadioColor (
  theme: DefaultTheme,
  key: keyof typeof darkColors | keyof typeof lightColors
) {
  return getColorFn(theme, { lightColors, darkColors })(key);
}

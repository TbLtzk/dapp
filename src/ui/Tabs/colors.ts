import { DefaultTheme } from 'styled-components';
import { COLORS, getColorFn } from 'styles/colors';

export const darkColors = {
  inactive: COLORS.grey300,
  active: COLORS.grey000,
  countBackground: COLORS.blue400,
  countNumber: COLORS.white,
  border: COLORS.blue700,
  borderHover: COLORS.blue500,
  borderActive: COLORS.grey100,
  borderFocus: COLORS.grey400,
};

export const lightColors = {
  inactive: COLORS.grey600,
  active: COLORS.blue800,
  countBackground: COLORS.blue400,
  countNumber: COLORS.white,
  border: COLORS.grey100,
  borderHover: COLORS.grey400,
  borderActive: COLORS.blue800,
  borderFocus: COLORS.grey400,
};

export function getTabColor (
  theme: DefaultTheme,
  key: keyof typeof darkColors | keyof typeof lightColors
) {
  return getColorFn(theme, { lightColors, darkColors })(key);
}

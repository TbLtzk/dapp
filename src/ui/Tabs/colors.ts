import { DefaultTheme } from 'styled-components';
import { COLORS, getColorFn } from 'styles/colors';

export const darkColors = {
  inactive: COLORS.grey300,
  active: COLORS.grey000,
  dividerActive: COLORS.grey100,
  countBackground: COLORS.blue400,
  countNumber: COLORS.white,
};

export const lightColors = {
  inactive: COLORS.grey600,
  active: COLORS.blue800,
  dividerActive: COLORS.blue700,
  countBackground: COLORS.blue400,
  countNumber: COLORS.white,
};

export function getTabColors (
  theme: DefaultTheme,
  key: keyof typeof darkColors | keyof typeof lightColors
) {
  return getColorFn(theme, { lightColors, darkColors })(key);
}

import { DefaultTheme } from 'styled-components';
import { COLORS, getColorFn } from 'styles/colors';

export const darkColors = {
  text: COLORS.blue800,
  pending: COLORS.yellow000,
  approved: COLORS.green100,
  rejected: COLORS.red200,
};

export const lightColors = {
  text: COLORS.blue800,
  pending: COLORS.yellow000,
  approved: COLORS.green100,
  rejected: COLORS.red200,
};

export function getTagColor (
  theme: DefaultTheme,
  key: keyof typeof darkColors | keyof typeof lightColors
) {
  return getColorFn(theme, { lightColors, darkColors })(key);
}

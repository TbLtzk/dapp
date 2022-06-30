import { DefaultTheme } from 'styled-components';
import { COLORS, getColorFn } from 'styles/colors';

export const darkColors = {
  bg: COLORS.grey100,
  text: COLORS.blue800,
};

export const lightColors = {
  bg: COLORS.blue800,
  text: COLORS.white,
};

export function getTooltipColor (
  theme: DefaultTheme,
  key: keyof typeof darkColors | keyof typeof lightColors
) {
  return getColorFn(theme, { lightColors, darkColors })(key);
}
